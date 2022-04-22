import fp from "fastify-plugin";
import { getRegionsUserHandler } from "../handler/region.handler";
import { getUserLevelsUserHandler } from "../handler/user-level.handler";
import { getUserTypesUserHandler } from "../handler/user-type.handler";

async function userLevel(instance, options, next) {
    instance.get(
        '/user-level',
        {
            preValidation: [instance.mightyAuth]
        },
        getUserLevelsUserHandler
    );

    next()
}

export const userLevelUserPlugin = fp(userLevel)