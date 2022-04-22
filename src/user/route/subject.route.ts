import fp from "fastify-plugin";
import { getRegionsUserHandler } from "../handler/region.handler";
import { getSubjectsUserHandler } from "../handler/subject.handler";
import { getUserTypesUserHandler } from "../handler/user-type.handler";

async function subject(instance, options, next) {
    instance.get(
        '/subject',
        {
            preValidation: [instance.mightyAuth]
        },
        getSubjectsUserHandler
    );

    next()
}

export const subjectUserPlugin = fp(subject)