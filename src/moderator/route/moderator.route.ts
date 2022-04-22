import fp from "fastify-plugin";
import { createModeratorHandler, deleteModeratorHandler, getAccessModeratorHandler, getModeratorByIdHandler, getModeratorsPagingHandler, loginModeratorHandler, updateModeratorHandler } from "../handler/moderator.handler";

function moderator(instance, options, next) {
    instance.post(
        '/moderator',
        {
            preValidation: [instance.auth]
        },
        createModeratorHandler
    )

    instance.put(
        '/moderator',
        {
            preValidation: [instance.auth]
        },
        updateModeratorHandler
    )

    instance.delete(
        '/moderator/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteModeratorHandler
    )

    instance.get(
        '/moderator/:_id',
        {
            preValidation: [instance.auth]
        },
        getModeratorByIdHandler
    );

    instance.get(
        '/moderator',
        {
            preValidation: [instance.auth]
        },
        getModeratorsPagingHandler
    );

    instance.post(
        '/login',
        loginModeratorHandler
    )

    instance.get(
        '/access',
        {
            preValidation: [instance.auth]
        },
        getAccessModeratorHandler
    )

    next()
}

export const moderatorPlugin = fp(moderator)