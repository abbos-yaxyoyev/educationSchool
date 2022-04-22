import fp from "fastify-plugin";
import { getRegionsUserHandler } from "../handler/region.handler";

async function region(instance, options, next) {
    instance.get(
        '/region',
        {
            preValidation: [instance.mightyAuth]
        },
        getRegionsUserHandler
    );

    next()
}

export const regionUserPlugin = fp(region)