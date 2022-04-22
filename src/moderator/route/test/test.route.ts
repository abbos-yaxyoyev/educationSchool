import fp from "fastify-plugin";
import { createTestHandler, deleteTestHandler, getTestByIdHandler, getTestPagingHandler, setTestStatusHandler, updateTestHandler } from "../../handler/test/test.handler";

async function test(instance, options, next) {
    instance.post(
        '/test',
        {
            preValidation: [instance.auth]
        },
        createTestHandler
    )

    instance.put(
        '/test',
        {
            preValidation: [instance.auth]
        },
        updateTestHandler
    );

    instance.delete(
        '/test/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteTestHandler
    );

    instance.get(
        '/test/:_id',
        {
            preValidation: [instance.auth]
        },
        getTestByIdHandler
    );

    instance.get(
        '/test',
        {
            preValidation: [instance.auth]
        },
        getTestPagingHandler
    )

    instance.post(
        '/test/availability',
        {
            preValidation: [instance.auth]
        },
        setTestStatusHandler
    )

    next()
}

export const testModeratoPlugin = fp(test)