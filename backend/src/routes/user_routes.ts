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
  app.search("/users", async (req, reply) => {
    const { id } = req.body;
    
    try {
      const theUser = await req.em.findOneOrFail(User, id, {strict: true});
      reply.send(theUser);
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
    console.log(userToChange);
    reply.send(userToChange);
});



// DELETE
}
