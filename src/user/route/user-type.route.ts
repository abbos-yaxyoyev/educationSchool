import fp from "fastify-plugin";
import { getRegionsUserHandler } from "../handler/region.handler";
import { getUserTypesUserHandler } from "../handler/user-type.handler";

async function userType(instance, options, next) {
    instance.get(
        '/user-type',
        {
            preValidation: [instance.mightyAuth]
        },
        getUserTypesUserHandler
    );

    next()
}

export const userTypeUserPlugin = fp(userType)