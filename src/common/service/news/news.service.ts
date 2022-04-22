import { Types } from "mongoose";
import { CollectionNames } from "../../db/models/base.model";
import { NewsError } from "../../db/models/news/news.error";
import { NewsModel } from "../../db/models/news/news.model";
import { NewsGetDto } from "../../validation/dto/news.dto";
import { aggregate, create, findById, findPagin, markAsDeleted, updateOne } from "../base.service";

export async function saveNewsService(data) {
    try {
        const topic = await create(NewsModel, data)
        return topic;
    } catch (e) {
        if (e.code == 11000) throw NewsError.AlreadyExists(Object.keys(e.keyPattern))
        throw NewsError.UnknownError(e);
    }
}


export async function updateNewsService(id: string, data) {
    try {
        const news = await updateOne(NewsModel, id, data);
        if (!news) throw NewsError.NotFound(id)
        return news;
    } catch (e) {
        if (e.code == 11000) throw NewsError.AlreadyExists(Object.keys(e.keyPattern))
        throw NewsError.UnknownError(e);
    }
}

export async function markNewsAsDeletedService(id: string) {
    await markAsDeleted(NewsModel, new Types.ObjectId(id))
}

export async function getNewsByIdService(id: string) {
    const news = await findById(NewsModel, id);
    if (!news) throw NewsError.NotFound(id);
    return news;
}

export async function getNewsByIdFullService(id: string) {
    const $match = {
        $match: {
            _id: new Types.ObjectId(id)
        }
    }

    const $lookupUserType = {
        $lookup: {
            from: CollectionNames.USER_TYPE,
            foreignField: '_id',
            localField: 'userTypeId',
            as: 'userType'
        }
    }

    const $unwindUserType = {
        $unwind: '$userType'
    }

    const $project = {
        $project: {
            _id: 1,
            title: 1,
            content: 1,
            image: 1,
            readCount: 1,
            isTop: 1,
            createdAt: 1,
            userType: {
                _id: 1,
                name: 1
            }
        }
    }

    const $pipeline = [
        $match,
        $lookupUserType,
        $unwindUserType,
        $project
    ]

    const data = await aggregate(NewsModel, $pipeline);
    const news = data.shift();
    if (!news) throw NewsError.NotFound(id);
    return news
}

export async function getNewsPagingService(dto: NewsGetDto) {
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

    if (dto.userTypeId) {
        query.userTypeId = new Types.ObjectId(dto.userTypeId)
    }

    if (dto.isTop) {
        dto.sortBy = 'readCount'
        dto.asc = 1
    }

    const $lookupRead = {
        $lookup: {
            from: CollectionNames.NEWS_READ,
            let: { newsId: '$_id' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: ['$newsId', '$$newsId']
                                },
                                {
                                    $eq: ['$userId', new Types.ObjectId(dto.userId)]
                                }
                            ]
                        }
                    }
                }
            ],
            as: 'newsRead'
        }
    }

    const $lookupUserType = {
        $lookup: {
            from: CollectionNames.USER_TYPE,
            foreignField: '_id',
            localField: 'userTypeId',
            as: 'userType'
        }
    }

    const $unwindUserType = {
        $unwind: '$userType'
    }

    const $project = {
        $project: {
            _id: 1,
            title: 1,
            image: 1,
            readCount: 1,
            isTop: 1,
            createdAt: 1,
            userType: {
                _id: 1,
                name: 1
            },
            isRead: {
                $size: '$newsRead'
            }
        }
    }

    const $pipeline = [
        $lookupUserType,
        $unwindUserType,
        $lookupRead,
        $project
    ]

    const news = await findPagin(NewsModel, query, dto, $pipeline);

    return news;
}