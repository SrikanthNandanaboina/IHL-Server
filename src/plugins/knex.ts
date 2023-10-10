import knex from "knex";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { AppOptions } from "../types";

export default fp(async function (fastify: FastifyInstance, opts: AppOptions) {
  const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } =
    opts;

  const knexClient = knex({
    client: "pg",
    connection: {
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
    },
  });

  if (knexClient) {
    fastify.decorate("knex", knexClient);
  }
});
