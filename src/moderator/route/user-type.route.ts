import fp from "fastify-plugin";
import { createUSerTypeHandler, deleteUserTypeHandler, getUserTypeByIdHandler, getUserTypePagingHandler, updateUserTypeHandler } from "../handler/user-type.handler";

async function userType(instance, options, next) {
    instance.post(
        '/user-type',
        {
            preValidation: [instance.auth]
        },
        createUSerTypeHandler
    )

    instance.put(
        '/user-type',
        {
            preValidation: [instance.auth]
        },
        updateUserTypeHandler
    )

    instance.delete(
        '/user-type/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteUserTypeHandler
    )

    instance.get(
        '/user-type/:_id',
        {
            preValidation: [instance.auth]
        },
        getUserTypeByIdHandler
    )

    instance.get(
        '/user-type',
        {
            preValidation: [instance.auth]
        },
        getUserTypePagingHandler
    );

    next()
}

export const userTypePlugin = fp(userType);