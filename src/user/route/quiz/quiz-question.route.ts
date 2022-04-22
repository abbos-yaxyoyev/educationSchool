import fp from "fastify-plugin";
import { getQuizQuestionsHandler, setAnswerToQuestionHandler } from "../../handler/quiz/quiz.question.handler";

async function question(instance, options, next) {
    instance.get(
        '/quiz/question/:_id',
        {
            preValidation: [instance.auth]
        },
        getQuizQuestionsHandler
    );

    instance.post(
        '/quiz/question',
        {
            preValidation: [instance.auth]
        },
        setAnswerToQuestionHandler
    );

    next()
}

export const questionUserPlugin = fp(question);