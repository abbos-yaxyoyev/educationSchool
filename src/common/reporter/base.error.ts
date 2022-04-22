export class BaseError {
    public constructor(
        public code: number,
        public message: string,
        public data: any
    ) {

    }

    static UnknownError(data: any = null) {
        return new BaseError(ErrorCodes.BASE, 'unknown_error', data)
    }

    static ValidationError(data: any = null) {
        return new BaseError(ErrorCodes.BASE + 2, 'validation_error', data)
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseError(ErrorCodes.BASE + 3, 'not_enough_permission', data)
    }

    static InvalidUploadType(data: any = null) {
        return new BaseError(ErrorCodes.BASE + 4, 'invalid_upload_type', data)
    }

    static SmsSendingFailed(data: any = null) {
        return new BaseError(ErrorCodes.BASE + 5, 'sms_sending_failed', data)
    }

    static Success(data: any = null) {
        return new BaseError(0, 'Ok', data)
    }
}

export enum ErrorCodes {
    BASE = 10000,
    USER = 11000,
    USER_TYPE = 12000,
    USER_LEVEL = 13000,
    SUBJECT = 14000,
    SECTION = 15000,
    TOPIC = 16000,
    MODERATOR = 17000,
    ROLE = 18000,
    REGION = 19000,
    NEWS = 20000,
    TEST = 21000,
    TEST_QUESTION = 22000,
    QUIZ = 23000,
    QUIZ_QUESTION = 24000,
}