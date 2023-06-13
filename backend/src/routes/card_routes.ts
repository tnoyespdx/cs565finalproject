import { FastifyInstance } from "fastify";
import { Card } from "../db/entities/Card.js";

export function CardRoutesInit(app: FastifyInstance) {
  
  // GET A CARD FROM THE DATABASE
  app.search<{ Body: { card_id: number } }>("/cards", async (req, reply) => {
    const { card_id } = req.body;
    try {
      const theCard = await req.em.findOneOrFail(Card, card_id, { strict: true });
      reply.send(theCard);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  // GET ALL CARDS FROM THE DATABASE
  app.get("/cards",
    async (req, reply) => {
      try {
        const theCard = await req.em.find(Card, {});
        return reply.send(theCard);
      } catch (err) {
        return reply.status(500).send(err);
      }
    });
  
  
  
}
