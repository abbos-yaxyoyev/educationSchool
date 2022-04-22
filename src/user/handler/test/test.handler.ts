import { QuizStatus } from "../../../common/db/models/test/quiz/quiz.model";
import { saveQuizQuestionsService } from "../../../common/service/quiz/quiz-question.service";
import { calculateTestUserCountService, createQuizService, getQuizByIdService, getQuizPagingService } from "../../../common/service/quiz/quiz.service";
import { getQuestionByTestService } from "../../../common/service/test/question.service";
import { getTestByIdService } from "../../../common/service/test/test.service";
import { BaseDtoGroup } from "../../../common/validation/dto/base.dto";
import { QuizGetDto } from "../../../common/validation/dto/quiz/quiz.dto";
import { TestGetDto } from "../../../common/validation/dto/test.dto";
import { validateIt } from "../../../common/validation/validator";
import { getTestByIdUserService, getTestPaginUserService } from "../../service/test.service";

export async function getTestsPagingUserHandler(request, reply) {
    const data = await validateIt(request.query, TestGetDto, BaseDtoGroup.GET_PAGING);

    if (request.user) data.userId = request.user._id;
    const tests = await getTestPaginUserService(data);

    return reply.success(tests);
}

export async function getTestByIdUserHandler(request, reply) {
    const data = await validateIt(request.params, TestGetDto, BaseDtoGroup.GET_BY_ID);
    if (request.user) data.userId = request.user._id;
    const test = await getTestByIdUserService(data._id, data.userId);

    return reply.success(test);
}

export async function registerForTestHandler(request, reply) {
    const data = await validateIt(request.params, TestGetDto, BaseDtoGroup.GET_BY_ID);

    const test = await getTestByIdService(data._id);

    const quiz = await createQuizService(
        {
            testId: test._id,
            userId: request.user._id,
            maxScore: test.maxScore,
            subjects: test.subjects,
            questionCount: test.questionCount   
        }
    );

    const questions = await getQuestionByTestService(test._id);

    const quizQuestions = questions.map(q => {
        return {
            questionId: q._id,
            quizId: quiz._id
        }
    })

    await saveQuizQuestionsService(quizQuestions);

    await calculateTestUserCountService(quiz.testId.toString())
    return reply.success(quiz._id);
}

export async function getTestResultsUserHandler(request, reply) {
    const data = await validateIt(request.query, QuizGetDto, BaseDtoGroup.GET_PAGING);

    data.status = QuizStatus.FINISHED;
    data.sortBy = 'score'

    const results = await getQuizPagingService(data);

    return reply.success(results);
}