import dotenv from "dotenv";
dotenv.config();
import fp from "fastify-plugin";
import app from "./app";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastify = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

const start = async (): Promise<void> => {
  fastify.register(fp(app), { ...process.env });
  try {
    await fastify.listen(
      { port: process.env.PORT, host: "0.0.0.0" },
      function (err: any, address: any) {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        } else {
          fastify.log.info(`Server is now listening on ${address}`);
        }
      }
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
