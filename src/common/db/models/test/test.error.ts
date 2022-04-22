import { BaseError, ErrorCodes } from "../../../reporter/base.error";

export class TestError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCodes.TEST, 'test_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCodes.TEST + 1, 'test_already_exists', data)
    }
}