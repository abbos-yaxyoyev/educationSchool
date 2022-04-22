import fp from "fastify-plugin";
import { createRoleModeratorHandler, deleteRoleModeratorHandler, getRoleByIdModeratorHandler, getRolesPagingModeratorHandler, updateRoleModeratorHandler } from "../handler/role.handler";

async function role(instance, options, next) {
    instance.post(
        '/role',
        {
            preValidation: [instance.auth]
        },
        createRoleModeratorHandler
    )

    instance.put(
        '/role',
        {
            preValidation: [instance.auth]
        },
        updateRoleModeratorHandler
    )

    instance.delete(
        '/role/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteRoleModeratorHandler
    )


    instance.get(
        '/role/:_id',
        {
            preValidation: [instance.auth]
        },
        getRoleByIdModeratorHandler
    )

    instance.get(
        '/role',
        {
            preValidation: [instance.auth]
        },
        getRolesPagingModeratorHandler
    )

    next()
}

export const roleModeratorPlugin = fp(role)