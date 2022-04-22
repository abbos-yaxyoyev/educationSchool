import fp from "fastify-plugin";
import { getSectionsUserHandler } from "../handler/section.handler";

async function section(instance, options, next) {
    instance.get(
        '/section',
        {
            preValidation: [instance.mightyAuth]
        },
        getSectionsUserHandler
    );

    next()
}

export const sectionUserPlugin = fp(section)