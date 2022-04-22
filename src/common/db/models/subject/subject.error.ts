import { BaseError, ErrorCodes } from "../../../reporter/base.error";

export class SubjectError extends BaseError {
    static NotFound(data: any = null) {
        return new SubjectError(ErrorCodes.SUBJECT, 'subject_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new SubjectError(ErrorCodes.SUBJECT + 1, 'subject_already_exists', data)
    }
}