import fp from "fastify-plugin";
import { getNewsByIdUserHandler, getNewsPagingUserHandler } from "../handler/news.handler";

async function news(instance, options, next) {
    instance.get(
        '/news',
        {
            preValidation: [instance.mightyAuth]
        },
        getNewsPagingUserHandler
    )

    instance.get(
        '/news/:_id',
        {
            preValidation: [instance.mightyAuth]
        },
        getNewsByIdUserHandler
    )

    next()
}

export const newsUserPlugin = fp(news)