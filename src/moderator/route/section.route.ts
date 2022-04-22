import fp from "fastify-plugin";
import { createSectionHandler, deleteSectionHandler, getSectionByIdHandler, getSectionPagingHandler, updateSectionHandler } from "../handler/section.handler";

async function section(instance, options, next) {
    instance.post(
        '/section',
        {
            preValidation: [instance.auth]
        },
        createSectionHandler
    )

    instance.put(
        '/section',
        {
            preValidation: [instance.auth]
        },
        updateSectionHandler
    )

    instance.delete(
        '/section/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteSectionHandler
    )

    instance.get(
        '/section/:_id',
        {
            preValidation: [instance.auth]
        },
        getSectionByIdHandler
    )

    instance.get(
        '/section',
        {
            preValidation: [instance.auth]
        },
        getSectionPagingHandler
    );

    next()
}

export const sectionPlugin = fp(section);