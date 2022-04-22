import fp from "fastify-plugin";
import { getQuestionByTestService } from "../../../common/service/test/question.service";
import { createQuestionHandler, deleteQuestionHandler, getTestQuestionsHandler, updateQuestionHandler } from "../../handler/test/question.handler";
import { createTestHandler } from "../../handler/test/test.handler";

async function question(instance, options, next) {
    instance.post(
        '/question',
        {
            preValidation: [instance.auth]
        },
        createQuestionHandler
    )

    instance.put(
        '/question',
        {
            preValidation: [instance.auth]
        },
        updateQuestionHandler
    )

    instance.delete(
        '/question/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteQuestionHandler
    )

    instance.get(
        '/questions/:testId',
        {
            preValidation: [instance.auth]
        },
        getTestQuestionsHandler
    );

    next()
}

export const questionPlugin = fp(question);