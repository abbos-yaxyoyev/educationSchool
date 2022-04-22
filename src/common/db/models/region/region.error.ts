import { BaseError, ErrorCodes } from "../../../reporter/base.error";

export class RegionError extends BaseError {
    static NotFound(data: any = null) {
        return new RegionError(ErrorCodes.REGION, 'region_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new RegionError(ErrorCodes.REGION + 1, 'region_already_exists', data)
    }
}