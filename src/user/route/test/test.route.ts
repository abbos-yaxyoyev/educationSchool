import fp from "fastify-plugin";
import { getTestPagingHandler } from "../../../moderator/handler/test/test.handler";
import { getTestByIdUserHandler, getTestResultsUserHandler, getTestsPagingUserHandler, registerForTestHandler } from "../../handler/test/test.handler";

async function test(instance, options, next) {
    instance.get(
        '/test',
        {
            preValidation: [instance.mightyAuth]
        },
        getTestsPagingUserHandler
    )

    instance.get(
        '/test/:_id',
        {
            preValidation: [instance.mightyAuth]
        },
        getTestByIdUserHandler
    );

    instance.post(
        '/test/register/:_id',
        {
            preValidation: [instance.auth]
        },
        registerForTestHandler
    );

    instance.get(
        '/test/results',
        {
            preValidation: [instance.mightyAuth]
        },
        getTestResultsUserHandler
    )

    next()

}

export const testUserPlugin = fp(test);