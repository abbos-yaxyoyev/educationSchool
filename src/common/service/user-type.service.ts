import { Types } from "mongoose";
import { RegionError } from "../db/models/region/region.error";
import { UserTypeError } from "../db/models/user/type/type.error";
import { UserTypeModel } from "../db/models/user/type/type.model";
import { RegionGetDto } from "../validation/dto/region.dto";
import { UserTypeGetDto } from "../validation/dto/user-type.dto";
import { create, findById, findPagin, markAsDeleted, updateOne } from "./base.service";

export async function saveUserTypeService(data) {
    try {
        const userType = await create(UserTypeModel, data)
        return userType;
    } catch (e) {
        if (e.code == 11000) throw UserTypeError.AlreadyExists(Object.keys(e.keyPattern))
        throw UserTypeError.UnknownError(e);
    }
}


export async function updateUserTypeService(id: string, data) {
    try {
        const userType = await updateOne(UserTypeModel, id, data);
        if (!userType) throw UserTypeError.NotFound(id)
        return userType;
    } catch (e) {
        if (e.code == 11000) throw UserTypeError.AlreadyExists(Object.keys(e.keyPattern))
        throw UserTypeError.UnknownError(e);
    }
}

export async function markUserTypeAsDeletedService(id: string) {
    await markAsDeleted(UserTypeModel, new Types.ObjectId(id))
}

export async function getUserTypeByIdService(id: string) {
    const region = await findById(UserTypeModel, id);
    if (!region) throw RegionError.NotFound(id);
    return region;
}

export async function getUserTypePagingService(dto: UserTypeGetDto) {
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

    const regions = await findPagin(UserTypeModel, query, dto, []);

    return regions;
}