import { join } from "path";
import AutoLoad from "@fastify/autoload";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { AppOptions } from "./types";
import auth from "@fastify/auth";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import rateLimit from "@fastify/rate-limit";

const app: FastifyPluginAsync<AppOptions> = async (
  fastify: FastifyInstance,
  opts: AppOptions
): Promise<void> => {
  fastify.register(cookie);

  fastify.addHook("onRequest", (req, res, done) => {
    try {
      if (req.headers["host"]) {
        if (
          opts.NODE_ENV !== "development" &&
          req.headers["host"].includes("localhost")
        )
          return res.code(400).send("Bad Request: INVALID_HEADERS");
      }
      done();
    } catch (err) {
      done();
    }
  });

  const allowedOrigins: string[] = opts.ALLOWED_ORIGINS.split("|");

  fastify.register(cors, {
    origin: allowedOrigins,
    credentials: true,
  });

  fastify.register(auth);
  fastify.register(multipart);

  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: {
      ...opts,
    },
  });

  fastify.register(rateLimit, {
    global: false, // default true
    whitelist: [], // default []
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    dirNameRoutePrefix: false,
  });
};

export default app;
