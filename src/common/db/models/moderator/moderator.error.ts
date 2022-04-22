import { BaseError, ErrorCodes } from "../../../reporter/base.error";

export class ModeratorError extends BaseError {
    static NotFound(data: any = null) {
        return new ModeratorError(ErrorCodes.MODERATOR, 'moderator_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new ModeratorError(ErrorCodes.MODERATOR + 1, 'moderator_already_exists', data)
    }
}