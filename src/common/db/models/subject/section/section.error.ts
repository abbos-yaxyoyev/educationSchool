import { BaseError, ErrorCodes } from "../../../../reporter/base.error";

export class SectionError extends BaseError {
    static NotFound(data: any = null) {
        return new SectionError(ErrorCodes.SECTION, 'section_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new SectionError(ErrorCodes.SECTION + 1, 'section_already_exists', data)
    }
}