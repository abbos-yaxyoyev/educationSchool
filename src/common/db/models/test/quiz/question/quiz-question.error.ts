import { BaseError, ErrorCodes } from "../../../../../reporter/base.error";

export class QuizQuestionError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCodes.QUIZ_QUESTION, 'quiz_question_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCodes.QUIZ_QUESTION, 'quiz_question_already_exists', data)
    }
}