import fp from "fastify-plugin";
import { finishQuizHandler, startQuizHandler } from "../../handler/quiz/quiz.handler";

async function quiz(instance, options, next) {
    instance.post(
        '/quiz/start/:_id',
        {
            preValidation: [instance.auth]
        },
        startQuizHandler
    );

    instance.post(
        '/quiz/finish/:_id',
        {
            preValidation: [instance.auth]
        },
        finishQuizHandler
    );
    next();
}

export const quizUserPlugin = fp(quiz);