import { Types } from "mongoose";
import { CollectionNames } from "../db/models/base.model";
import { UserError } from "../db/models/user/user.error";
import { UserModel } from "../db/models/user/user.model";
import { aggregate, create, findOne, updateOne } from "./base.service";

export async function saveUserService(data: any) {
    try {
        const user = await create(UserModel, data, { password: 0 });
        return user;
    } catch (e) {
        if (e.name == 'MongoError' && e.code == 11000) {
            throw UserError.AlreadyExists(Object.keys(e.keyPattern))
        }
        throw UserError.UnknownError(e)
    }
}

export async function updateUserService(id: any, data: any) {
    try {
        const user = await updateOne(UserModel, new Types.ObjectId(id), data, { password: 0 });
        return user;
    } catch (e) {
        if (e.name == 'MongoError' && e.code == 11000) {
            throw UserError.AlreadyExists(Object.keys(e.keyPattern))
        }
        throw UserError.UnknownError(e)
    }
}

export async function getUserByPhoneNumberService(phoneNumber: string) {
    const query = {
        phoneNumber: phoneNumber,
        isDeleted: false
    };

    const user = await findOne(UserModel, query);

    if (!user) throw UserError.NotFound(phoneNumber);

    return user;
}

export async function getUserByIdFullService(id) {
    const $match = {
        $match: {
            _id: new Types.ObjectId(id)
        }
    }

    const $lookupRegion = {
        $lookup: {
            from: CollectionNames.REGION,
            foreignField: '_id',
            localField: 'regionId',
            as: 'region'
        }
    }

    const $unwindRegion = {
        $unwind: {
            path: '$region',
            preserveNullAndEmptyArrays: true
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
            phoneNumber: 1,
            firstName: 1,
            region: {
                _id: 1,
                name: 1
            },
            userType: {
                _id: 1,
                name: 1
            },
            gender: 1,
            birthDate: 1,
            image: 1
        }
    }

    const $pipeline = [
        $match,
        $lookupRegion,
        $lookupUserType,
        $unwindRegion,
        $unwindUserType,
        $project
    ];

    const data = await aggregate(UserModel, $pipeline);

    const user = data.shift();

    if (!user) throw UserError.NotFound(id);
    return user;
}

