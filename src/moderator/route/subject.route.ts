import fp from "fastify-plugin";
import { createSubjectHandler, deleteSubjectHandler, getSubjectByIdHandler, getSubjectPagingHandler, updateSubjectHandler } from "../handler/subject.handler";

async function subject(instance, options, next) {
    instance.post(
        '/subject',
        {
            preValidation: [instance.auth]
        },
        createSubjectHandler
    )

    instance.put(
        '/subject',
        {
            preValidation: [instance.auth]
        },
        updateSubjectHandler
    )

    instance.delete(
        '/subject/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteSubjectHandler
    )

    instance.get(
        '/subject/:_id',
        {
            preValidation: [instance.auth]
        },
        getSubjectByIdHandler
    )

    instance.get(
        '/subject',
        {
            preValidation: [instance.auth]
        },
        getSubjectPagingHandler
    );

    next()
}

export const subjectPlugin = fp(subject);