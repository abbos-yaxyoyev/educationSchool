import { BaseError, ErrorCodes } from "../../../../../reporter/base.error";

export class TopicError extends BaseError {
    static NotFound(data: any = null) {
        return new TopicError(ErrorCodes.TOPIC, 'topic_not_found', data)
    }

    static AlreadyExists(data: any = null) {
        return new TopicError(ErrorCodes.TOPIC + 1, 'topic_already_exists', data)
    }
}