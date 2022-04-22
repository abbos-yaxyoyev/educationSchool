import fp from "fastify-plugin";
import { createUserLevelHandler, deleteUserLevelHandler, getUserLevelByIdHandler, getUserLevelPagingHandler, updateUserLevelHandler } from "../handler/user.level.handler";

async function userLevel(instance, options, next) {
    instance.post(
        '/user-level',
        {
            preValidation: [instance.auth]
        },
        createUserLevelHandler
    )

    instance.put(
        '/user-level',
        {
            preValidation: [instance.auth]
        },
        updateUserLevelHandler
    )

    instance.delete(
        '/user-level/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteUserLevelHandler
    )

    instance.get(
        '/user-level/:_id',
        {
            preValidation: [instance.auth]
        },
        getUserLevelByIdHandler
    )

    instance.get(
        '/user-level',
        {
            preValidation: [instance.auth]
        },
        getUserLevelPagingHandler
    );

    next()
}

export const userLevelPlugin = fp(userLevel);