import { Collection, Types } from "mongoose";
import { CollectionNames } from "../db/models/base.model";
import { RegionError } from "../db/models/region/region.error";
import { SubjectError } from "../db/models/subject/subject.error";
import { SubjectModel } from "../db/models/subject/subject.model";
import { SubjectGetDto } from "../validation/dto/subject.dto";
import { aggregate, create, findById, findPagin, markAsDeleted, updateOne } from "./base.service";

export async function saveSubjectService(data) {
    try {
        const subject = await create(SubjectModel, data)
        return subject;
    } catch (e) {
        if (e.code == 11000) throw SubjectError.AlreadyExists(Object.keys(e.keyPattern))
        throw SubjectError.UnknownError(e);
    }
}


export async function updateSubjectService(id: string, data) {
    try {
        const subject = await updateOne(SubjectModel, id, data);
        if (!subject) throw SubjectError.NotFound(id)
        return subject;
    } catch (e) {
        if (e.code == 11000) throw SubjectError.AlreadyExists(Object.keys(e.keyPattern))
        throw SubjectError.UnknownError(e);
    }
}

export async function markSubjectAsDeletedService(id: string) {
    await markAsDeleted(SubjectModel, new Types.ObjectId(id))
}

export async function getSubjectByIdService(id: string) {
    const subject = await findById(SubjectModel, id);
    if (!subject) throw RegionError.NotFound(id);
    return subject;
}

export async function getSubjectByIdFullService(id: string) {
    const $match = {
        $match: {
            _id: new Types.ObjectId(id)
        }
    }

    const $unwindUserLevelIds = {
        $unwind: {
            path: '$userLevelIds',
            preserveNullAndEmptyArrays: true
        }
    }


    const $lookupUserLevels = {
        $lookup: {
            from: CollectionNames.USER_LEVEL,
            foreignField: '_id',
            localField: 'userLevelIds',
            as: 'userLevel'
        }
    }

    const $unwindUserLevels = {
        $unwind: '$userLevel'
    }

    const $project = {
        $project: {
            _id: 1,
            name: 1,
            image: 1,
            color: 1,
            userLevel: {
                _id: 1,
                name: 1
            }
        }
    }

    const $group = {
        $group: {
            _id: '$_id',
            doc: { $first: '$$ROOT' },
            userLevels: {
                $push: '$userLevel'
            }
        }
    }


    const $replaceRoot = {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    '$doc',
                    {
                        userLevels: '$userLevels'
                    }
                ]
            }
        }
    }

    const $projectLatest = {
        $project: {
            _id: 1,
            name: 1,
            image: 1,
            color: 1,
            userLevels: 1
        }
    }

    const $pipeline = [
        $match,
        $unwindUserLevelIds,
        $lookupUserLevels,
        $unwindUserLevels,
        $project,
        $group,
        $replaceRoot,
        $projectLatest
    ]

    const data = await aggregate(SubjectModel, $pipeline);
    const subject = data.shift()
    if (!subject) throw SubjectError.NotFound();
    return subject;
}

export async function getSubjectPagingService(dto: SubjectGetDto) {
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
        query.userLevelIds = new Types.ObjectId(dto.userLevelId)
    }


    const subjects = await findPagin(SubjectModel, query, dto, []);

    return subjects;
}