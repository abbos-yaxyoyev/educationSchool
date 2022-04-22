import { BaseError, ErrorCodes } from "../../../../../reporter/base.error";

export class UserLevelError extends BaseError {
    static NotFound(data: any = null) {
        return new UserLevelError(ErrorCodes.USER_LEVEL, 'level_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new UserLevelError(ErrorCodes.USER_LEVEL + 1, 'level_already_exists', data)
    }
}