import { QuizStatus } from "../../../common/db/models/test/quiz/quiz.model";
import { UserError } from "../../../common/db/models/user/user.error";
import { calculateQuizResultService, calculateTestUserCountService, getQuizByIdService, updateQuizService } from "../../../common/service/quiz/quiz.service";
import { BaseDtoGroup } from "../../../common/validation/dto/base.dto";
import { QuizDto } from "../../../common/validation/dto/quiz/quiz.dto";
import { validateIt } from "../../../common/validation/validator";

export async function startQuizHandler(request, reply) {
    const data = await validateIt(request.params, QuizDto, BaseDtoGroup.GET_BY_ID);

    const quiz = await getQuizByIdService(data._id);
    if (quiz.userId.toString() != request.user._id.toString()) throw UserError.NotEnoughPermission()
    if (quiz.status == QuizStatus.STARTED) return reply.success(quiz._id)
    const response = await updateQuizService(data._id,
        {
            status: QuizStatus.STARTED,
            startedAt: new Date()
        }
    );

    await calculateTestUserCountService(quiz.testId.toString())
    return reply.success(response);
}

export async function finishQuizHandler(request, reply) {
    const data = await validateIt(request.params, QuizDto, BaseDtoGroup.GET_BY_ID);

    const quiz = await getQuizByIdService(data._id);
    if (quiz.status == QuizStatus.FINISHED) return reply.success(quiz)
    if (quiz.userId.toString() != request.user._id.toString()) throw UserError.NotEnoughPermission()
    const response = await calculateQuizResultService(data._id);
    return reply.success(response);
}