import { BaseError, ErrorCodes } from "../../../reporter/base.error";

export class NewsError extends BaseError {
    static NotFound(data: any = null) {
        return new NewsError(ErrorCodes.NEWS, 'news_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new NewsError(ErrorCodes.NEWS + 1, 'news_already_exists', data)
    }
}