import fp from "fastify-plugin";
import { getTopicsUserHandler } from "../handler/topic.handler";

async function topic(instance, options, next) {
    instance.get(
        '/topic',
        {
            preValidation: [instance.mightyAuth]
        },
        getTopicsUserHandler
    );

    next()
}

export const topicUserPlugin = fp(topic)