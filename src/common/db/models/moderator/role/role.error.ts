import { BaseError, ErrorCodes } from "../../../../reporter/base.error";

export class RoleError extends BaseError {
    static NotFound(data: any = null) {
        return new RoleError(ErrorCodes.ROLE, 'role_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new RoleError(ErrorCodes.ROLE, 'role_already_exists', data)
    }
}