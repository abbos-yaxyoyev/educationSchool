import { Types } from "mongoose";
import { userTypePlugin } from "../../moderator/route/user-type.route";
import { CollectionNames } from "../db/models/base.model";
import { RegionError } from "../db/models/region/region.error";
import { UserLevelError } from "../db/models/user/type/level/level.error";
import { UserLevelModel } from "../db/models/user/type/level/level.model";
import { UserTypeError } from "../db/models/user/type/type.error";
import { UserLevelGetDto } from "../validation/dto/user-level.dto";
import { aggregate, create, find, findById, findPagin, markAsDeleted, updateOne } from "./base.service";

export async function saveUserLevelService(data) {
    try {
        const userLevel = await create(UserLevelModel, data)
        return userLevel;
    } catch (e) {
        if (e.code == 11000) throw UserLevelError.AlreadyExists(Object.keys(e.keyPattern))
        throw UserLevelError.UnknownError(e);
    }
}


export async function updateUserLevelService(id: string, data) {
    try {
        const userLevel = await updateOne(UserLevelModel, id, data);
        if (!userLevel) throw UserLevelError.NotFound(id)
        return userLevel;
    } catch (e) {
        if (e.code == 11000) throw UserLevelError.AlreadyExists(Object.keys(e.keyPattern))
        throw UserLevelError.UnknownError(e);
    }
}

export async function markUserLevelAsDeletedService(id: string) {
    await markAsDeleted(UserLevelModel, new Types.ObjectId(id))
}

export async function getUserLevelByIdService(id: string) {
    const userLevel = await findById(UserLevelModel, id);
    if (!userLevel) throw RegionError.NotFound(id);
    return userLevel;
}

export async function getUserLevelByIdFullService(id: string) {
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
        $unwind: {
            path: '$userType',
            preserveNullAndEmptyArrays: true
        }
    }

    const $project = {
        $project: {
            _id: 1,
            name: 1,
            userType: 1
        }
    }

    const $pipeline = [
        $match,
        $lookupUserType,
        $unwindUserType,
        $project
    ]

    const data = await aggregate(UserLevelModel, $pipeline)
    const userType = data.shift()
    if (userType) throw UserTypeError.NotFound(id);
    return userTypePlugin;
}

export async function getUserLevelPagingService(dto: UserLevelGetDto) {
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

    const $lookupUserType = {
        $lookup: {
            from: CollectionNames.USER_TYPE,
            foreignField: '_id',
            localField: 'userTypeId',
            as: 'userType'
        }
    }

    const $unwinduserType = {
        $unwind: {
            path: '$userType',
            preserveNullAndEmptyArrays: true
        }
    };

    const $project = {
        $project: {
            _id: 1,
            name: 1,
            userType: {
                _id: 1,
                name: 1
            }
        }
    }

    const $pipeline = [
        $lookupUserType,
        $unwinduserType,
        $project
    ]
    const levels = await findPagin(UserLevelModel, query, dto, $pipeline);

    return levels;
}

export async function getUserLevelsOfUserTypeService(data: UserLevelGetDto) {
    const query = {
        isDeleted: false,
        userTypeId: new Types.ObjectId(data.userTypeId)
    }

    const userLevels = await find(UserLevelModel, query);

    return userLevels;
}