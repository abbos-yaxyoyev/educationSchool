import { BaseError, ErrorCodes } from "../../../../reporter/base.error";

export class QuizError extends BaseError {
    static NotFound(data: any = null) {
        return new QuizError(ErrorCodes.QUIZ, 'quiz_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new QuizError(ErrorCodes.QUIZ + 1, 'quiz_already_exists', data)
    }

    static NotStarted(data: any = null) {
        return new QuizError(ErrorCodes.QUIZ + 2, 'quiz_not_started', data)
    }
}