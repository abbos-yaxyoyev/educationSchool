import fp from "fastify-plugin";
import { createTopicHandler, updateTopicHandler, deleteTopicHandler, getTopicByIdHandler, getTopicPagingHandler } from "../handler/topic.handler";
async function topic(instance, options, next) {
    instance.post(
        '/topic',
        {
            preValidation: [instance.auth]
        },
        createTopicHandler
    )

    instance.put(
        '/topic',
        {
            preValidation: [instance.auth]
        },
        updateTopicHandler
    )

    instance.delete(
        '/topic/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteTopicHandler
    )

    instance.get(
        '/topic/:_id',
        {
            preValidation: [instance.auth]
        },
        getTopicByIdHandler
    )

    instance.get(
        '/topic',
        {
            preValidation: [instance.auth]
        },
        getTopicPagingHandler
    );

    next()
}

export const topicPlugin = fp(topic);