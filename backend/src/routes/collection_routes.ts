import { FastifyInstance } from "fastify";
import { Card } from "../db/entities/Card.js";
import { Collected } from "../db/entities/Collected.js";
import { User, UserRole } from "../db/entities/User.js";
import { UserIdCardId, UserInfo, UsernameId } from "../types.js";

export function CollectionRoutesInit(app: FastifyInstance) {
  
  // CREATE: Add a new card to a collection
  app.post<{ Body: UserIdCardId }>("/collection/add", async (req, reply) => {
    try {
      const { user_id, card_id } = req.body;
      const owner = await req.em.getReference(User, user_id);
      const card = await req.em.getReference(Card, card_id);
      const newCollectedCard = await req.em.create(Collected, {
        owner,
        card,
      });
      await req.em.flush();
      return reply.send(newCollectedCard);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
  
  // READ: Get all of the cards in a user's collection
  app.search<{ Body: { user_id: number } }>("/collection", async (req, reply) => {
    const { user_id } = req.body;
    
    try {
      const userEntity = await req.em.getReference(User, user_id);
      const collected = await req.em.find(Collected, { owner: userEntity });
      return reply.send(collected);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
  
  // UPDATE
  

  // DELETE
 

  
}
