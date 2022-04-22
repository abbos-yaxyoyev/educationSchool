import { Types } from "mongoose";
import { ModeratorError } from "../../common/db/models/moderator/moderator.error";
import { ModeratorModel } from "../../common/db/models/moderator/moderator.model";
import { create, updateOne, markAsDeleted, findOne, findPagin, aggregate } from "../../common/service/base.service";
import md5 from 'md5'
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { CollectionNames } from "../../common/db/models/base.model";

export async function saveModeratorService(data) {
    try {
        const moderator = await create(ModeratorModel, data);
        return moderator;
    } catch (e) {
        if (e.code == 11000) throw ModeratorError.AlreadyExists(Object.keys(e.keyPattern))
        throw ModeratorError.UnknownError(e)
    }
}

export async function updateModeratorService(id, data) {
    try {
        const moderator = await updateOne(ModeratorModel, new Types.ObjectId(id), data);
        if (!moderator) throw ModeratorError.NotFound(id);
        return moderator;
    } catch (e) {
        if (e.code == 11000) throw ModeratorError.AlreadyExists(Object.keys(e.keyPattern))
        throw ModeratorError.UnknownError(e)
    }
}

export async function markModeratorAsDeletedService(id) {
    try {
        return await markAsDeleted(ModeratorModel, id)
    } catch (e) {
        throw ModeratorError.UnknownError(e)
    }
}

export async function getModeratorByNumberAndPasswordService(phoneNumber: string, password: string) {
    console.log(md5(password))
    const query = {
        phoneNumber: phoneNumber,
        password: md5(password),
        isDeleted: false
    };

    const $project = {
        _id: 1,
        fullName: 1,
        phoneNumber: 1
    }

    const moderator = await findOne(ModeratorModel, query, $project);

    if (!moderator) throw ModeratorError.NotFound(phoneNumber)

    return moderator;
}


export async function getModeratorByNumberService(phoneNumber: string) {
    const query = {
        phoneNumber: phoneNumber,
        isDeleted: false
    };

    const moderator = await findOne(ModeratorModel, query);

    if (!moderator) throw ModeratorError.NotFound(phoneNumber)

    return moderator;
}

export async function getModeratorsPagingService(dto: PagingDto) {
    const query = {
        isDeleted: false
    }

    const $lookupRole = {
        $lookup: {
            from: CollectionNames.ROLE,
            foreignField: '_id',
            localField: 'roleId',
            as: 'role'
        }
    }

    const $unwindRole = {
        $unwind: {
            path: '$role',
            preserveNullAndEmptyArrays: true
        }
    }

    const $project = {
        $project: {
            _id: 1,
            fullName: 1,
            phoneNumber: 1,
            role: {
                _id: 1,
                name: 1
            }
        }
    }

    const $pipeline = [
        $lookupRole,
        $unwindRole,
        $project
    ]

    const moderators = await findPagin(ModeratorModel, query, dto, $pipeline)
    return moderators;
}

export async function getModeratorByIdService(id) {
    const $match = {
        $match: {
            _id: new Types.ObjectId(id)
        }
    }


    const $lookupRole = {
        $lookup: {
            from: CollectionNames.ROLE,
            foreignField: '_id',
            localField: 'roleId',
            as: 'role'
        }
    }

    const $unwindRole = {
        $unwind: {
            path: '$role',
            preserveNullAndEmptyArrays: true
        }
    }

    const $project = {
        $project: {
            _id: 1,
            fullName: 1,
            phoneNumber: 1,
            role: {
                _id: 1,
                name: 1
            }
        }
    }

    const $pipeline = [
        $match,
        $lookupRole,
        $unwindRole,
        $project
    ]

    const data = await aggregate(ModeratorModel, $pipeline);

    const moderator = data.shift();
    console.log(data)

    if (!moderator) throw ModeratorError.NotFound(id);

    return moderator
}