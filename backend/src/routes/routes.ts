import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import { CollectionRoutesInit } from "./collection_routes.js";
import { UserRoutesInit } from "./user_routes.js";
import { CardRoutesInit } from "./card_routes.js";
import { WantedRoutesInit } from "./wanted_routes.js";

/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function MyAppRoutes(app: FastifyInstance, _options = {}) {
  if (!app) {
    throw new Error("Fastify instance has no value during routes construction");
  }
  
  UserRoutesInit(app);
  CollectionRoutesInit(app);
  CardRoutesInit(app);
  WantedRoutesInit(app);
  
  app.get("/", async (req, reply) => {
    reply.send("Hello world");
  })
}

export default MyAppRoutes;
