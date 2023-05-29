import Fastify from "fastify";
import cors from "@fastify/cors";

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: "debug",
  },
  production: {
    level: "error"
  },
  test: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: "warn"
  },
};

const app = Fastify({
  logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
  origin: (origin, cb) => {
    cb(null, true);
  }
});


export default app;
