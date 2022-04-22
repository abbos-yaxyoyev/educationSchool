import fp from "fastify-plugin";
import { createNewsHandler, deleteNewsHandler, getNewsByIdHandler, getNewsPagingHandler, updateNewsHandler } from "../handler/news.handler";

async function news(instance, options, next) {
    instance.post(
        '/news',
        {
            preValidation: [instance.auth]
        },
        createNewsHandler
    )

    instance.put(
        '/news',
        {
            preValidation: [instance.auth]
        },
        updateNewsHandler
    )

    instance.delete(
        '/news/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteNewsHandler
    )

    instance.get(
        '/news/:_id',
        {
            preValidation: [instance.auth]
        },
        getNewsByIdHandler
    )

    instance.get(
        '/news',
        {
            preValidation: [instance.auth]
        },
        getNewsPagingHandler
    );

    next()
}

export const newsPlugin = fp(news);