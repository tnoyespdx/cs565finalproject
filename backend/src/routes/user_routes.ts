import { FastifyInstance } from "fastify";
import { User, UserRole } from "../db/entities/User.js";
import { UserInfo, UsernameId } from "../types.js";

export function UserRoutesInit(app: FastifyInstance) {

  // CREATE A NEW USER
  app.post<{ Body: UserInfo }>("/users", async (req, reply) => {
    try {
      const { username, email } = req.body;
      const newUser = await req.em.create(User, {
        username,
        email,
        role: UserRole.USER // Every new user created this way is not an admin
      });
      await req.em.flush();
      return reply.send(newUser);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });

  // READ
  app.search<{ Body: { email: string } }>("/users", async (req, reply) => {
    const { email } = req.body;
    
    try {
      const theUser = await req.em.findOne(User, {email});
      return reply.send(theUser);
    } catch (err) {
      reply.status(500).send(err);
    }
  });
  
  // UPDATE
  app.put<{ Body: UsernameId}>("/users", async(req, reply) => {
    const { id , username} = req.body;
    const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
    userToChange.username = username;
    await req.em.flush();
    reply.send(userToChange);
});

// DELETE
  app.delete<{ Body: { my_id: number; id_to_delete: number} }>("/users", async (req, reply) => {
    const { my_id, id_to_delete} = req.body;
    
    try {
      const me = await req.em.findOneOrFail(User, my_id, {strict: true});
      
      // Make sure the requester is an Admin
      if (me.role === UserRole.USER) {
        console.log("Only an ADMIN can delete a user.");
        return reply.status(401).send()
      }
      
      const theUserToDelete = await req.em.findOneOrFail(User, id_to_delete, {strict: true});
    
      await req.em.remove(theUserToDelete).flush();
      return reply.send(theUserToDelete);
    } catch (err) {
      return reply.status(500).send(err);
    }
  });
  
}
