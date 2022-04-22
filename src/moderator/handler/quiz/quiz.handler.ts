import { getQuizPagingService } from "../../../common/service/quiz/quiz.service";
import { BaseDtoGroup } from "../../../common/validation/dto/base.dto";
import { QuizGetDto } from "../../../common/validation/dto/quiz/quiz.dto";
import { validateIt } from "../../../common/validation/validator";

export async function getQuizPagingModeratorHandler(request, reply) {
    const data = await validateIt(request.body, QuizGetDto, BaseDtoGroup.GET_PAGING);

    const quizzes = await getQuizPagingService(data);

    return reply.success(quizzes)
}