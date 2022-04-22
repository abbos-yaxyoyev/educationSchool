import { QuizError } from "../../../common/db/models/test/quiz/quiz.error";
import { QuizStatus } from "../../../common/db/models/test/quiz/quiz.model";
import { getQuizQuestionByIdService, getQuizQuestionsService, updateQuizQuestionService } from "../../../common/service/quiz/quiz-question.service";
import { getQuizByIdService } from "../../../common/service/quiz/quiz.service";
import { BaseDtoGroup } from "../../../common/validation/dto/base.dto";
import { QuizQuestionDto, QuizQuestionGetDto } from "../../../common/validation/dto/quiz/quiz-question.dto";
import { validateIt } from "../../../common/validation/validator";

export async function getQuizQuestionsHandler(request, reply) {
    const data = await validateIt(request.params, QuizQuestionGetDto, BaseDtoGroup.GET_BY_ID);
    const quiz = await getQuizByIdService(data._id);
    if (quiz.status != QuizStatus.STARTED) throw QuizError.NotStarted(data._id)
    const questions = await getQuizQuestionsService(data._id);
    return reply.success(questions)
}

export async function setAnswerToQuestionHandler(request, reply) {
    const data = await validateIt(request.body, QuizQuestionDto, BaseDtoGroup.GET_BY_ID);
    const question = await getQuizQuestionByIdService(data._id);
    const quiz = await getQuizByIdService(question.quizId);
    console.log(question)
    console.log(quiz)
    console.log(request.user)
    if (quiz.userId.toString() != request.user._id.toString()) throw QuizError.NotEnoughPermission();
    const response = await updateQuizQuestionService(data._id, data);
    return reply.success(response);
}