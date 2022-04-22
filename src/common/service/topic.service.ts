import { Types } from "mongoose";
import { TopicError } from "../db/models/subject/section/topic/topic.error";
import { TopicModel } from "../db/models/subject/section/topic/topic.model";
import { TopicGetDto } from "../validation/dto/topic.dto";
import { create, findById, findPagin, markAsDeleted, updateOne } from "./base.service";

export async function saveTopicService(data) {
    try {
        const topic = await create(TopicModel, data)
        return topic;
    } catch (e) {
        if (e.code == 11000) throw TopicError.AlreadyExists(Object.keys(e.keyPattern))
        throw TopicError.UnknownError(e);
    }
}


export async function updateTopicService(id: string, data) {
    try {
        const topic = await updateOne(TopicModel, id, data);
        if (!topic) throw TopicError.NotFound(id)
        return topic;
    } catch (e) {
        if (e.code == 11000) throw TopicError.AlreadyExists(Object.keys(e.keyPattern))
        throw TopicError.UnknownError(e);
    }
}

export async function markTopicAsDeletedService(id: string) {
    await markAsDeleted(TopicModel, new Types.ObjectId(id))
}

export async function getTopicByIdService(id: string) {
    const topic = await findById(TopicModel, id);
    if (!topic) throw TopicError.NotFound(id);
    return topic;
}

export async function getTopicPagingService(dto: TopicGetDto) {
    const query: any = {
        isDeleted: false
    }

    if (dto.search) {
        query.$or = [
            {
                'name.uz': {
                    $options: 'i',
                    $regex: dto.search
                }
            },

            {
                'name.default': {
                    $options: 'i',
                    $regex: dto.search
                }
            },

            {
                'name.ru': {
                    $options: 'i',
                    $regex: dto.search
                }
            },

            {
                'name.en': {
                    $options: 'i',
                    $regex: dto.search
                }
            }]
    }

    if (dto.userLevelId) {
        query.userLevelId = new Types.ObjectId(dto.userLevelId)
    }

    if (dto.subjectId) {
        query.subjectId = new Types.ObjectId(dto.subjectId)
    }

    if (dto.sectionId) {
        query.sectionId = new Types.ObjectId(dto.sectionId)
    }

    const topics = await findPagin(TopicModel, query, dto, []);

    return topics;
}