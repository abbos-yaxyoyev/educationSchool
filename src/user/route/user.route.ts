import fp from "fastify-plugin";
import { getProfileHandler, loginUserHandler, registerUserHandler, removeProfileImageUserHandler, updateUserHandler } from "../handler/user.handler";

async function user(instance, options, next) {
    instance.post(
        '/register',
        registerUserHandler
    )

    instance.post(
        '/login',
        loginUserHandler
    )

    instance.get(
        '/profile',
        {
            preValidation: [instance.auth]
        },
        getProfileHandler
    );

    instance.put(
        '/update',
        {
            preValidation: [instance.auth]
        },
        updateUserHandler
    );

    instance.delete(
        '/profile/image',
        {
            preValidation: [instance.auth]
        },
        removeProfileImageUserHandler
    );
    next()
}

export const userPlugin = fp(user)