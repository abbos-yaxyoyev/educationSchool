import { BaseError, ErrorCodes } from "../../../../reporter/base.error";

export class QuestionError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCodes.TEST_QUESTION, 'question_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCodes.TEST_QUESTION + 1, 'question_not_found', data)
    }

    static SubjectIdRequired(data: any = null) {
        return new BaseError(ErrorCodes.TEST_QUESTION + 2, 'subject_id_required', data)
    }
}