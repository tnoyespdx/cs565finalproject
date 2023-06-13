import { FastifyInstance } from "fastify";
import { Card } from "../db/entities/Card.js";
import { User } from "../db/entities/User.js";
import { Wanted } from "../db/entities/Wanted.js";
import { UserIdCardId } from "../types.js";

export function WantedRoutesInit(app: FastifyInstance) {
  
  // CREATE: Add a new card to a collection
  app.post<{ Body: UserIdCardId }>("/wanted/add", async (req, reply) => {
    try {
      const { user_id, card_id } = req.body;
      const owner = await req.em.getReference(User, user_id);
      const card = await req.em.getReference(Card, card_id);
      const newWantedCard = await req.em.create(Wanted, {
        owner,
        card,
      });
      await req.em.flush();
      return reply.send(newWantedCard);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
  
  // READ: Get all of the cards in a user's want list
  app.search<{ Body: { user_id: number } }>("/wanted", async (req, reply) => {
    const { user_id } = req.body;
    
    try {
      const userEntity = await req.em.getReference(User, user_id);
      const collected = await req.em.find(Wanted, { owner: userEntity });
      return reply.send(collected);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
  
  
  // UPDATE
  
  
  // DELETE
  
  
  
}
