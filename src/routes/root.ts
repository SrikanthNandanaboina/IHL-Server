import { FastifyPluginAsync } from "fastify";
import moment from "moment-timezone";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (req, reply) => {
      reply.send({ now: moment.utc().format() });
    },
  });
};

export default root;
