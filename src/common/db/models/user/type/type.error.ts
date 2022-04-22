import { BaseError, ErrorCodes } from "../../../../reporter/base.error";

export class UserTypeError extends BaseError {
    static NotFound(data: any = null) {
        return new UserTypeError(ErrorCodes.USER_TYPE, 'user_type_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new UserTypeError(ErrorCodes.USER_TYPE + 1, 'user_type_already_exists', data)
    }
}