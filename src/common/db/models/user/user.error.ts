import { BaseError, ErrorCodes } from "../../../reporter/base.error";

export class UserError extends BaseError {
    static NotFound(data: any = null) {
        return new BaseError(ErrorCodes.USER, 'user_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new BaseError(ErrorCodes.USER + 1, 'user_already_exists', data)
    }

    static Blocked(data: any = null) {
        return new BaseError(ErrorCodes.USER + 2, 'user_blocked', data)
    }

    static WrongOtp(data: any = null) {
        return new BaseError(ErrorCodes.USER + 3, 'wrong_otp', data)
    }
}