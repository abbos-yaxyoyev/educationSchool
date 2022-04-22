import { Types } from "mongoose";
import { RegionError } from "../db/models/region/region.error";
import { RegionModel } from "../db/models/region/region.model";
import { RegionDto, RegionGetDto } from "../validation/dto/region.dto";
import { create, findById, findPagin, markAsDeleted, updateOne } from "./base.service";

export async function saveRegionService(data) {
    try {
        const region = await create(RegionModel, data);
        return region;
    } catch (e) {
        if (e.code == 11000) throw RegionError.AlreadyExists(Object.keys(e.keyPattern))

        throw RegionError.UnknownError(e);
    }
}


export async function updateRegionService(id: string, data) {
    try {
        const region = await updateOne(RegionModel, new Types.ObjectId(id), data);
        return region;
    } catch (e) {
        if (e.code == 11000) throw RegionError.AlreadyExists(Object.keys(e.keyPattern))

        throw RegionError.UnknownError(e);
    }
}

export async function markRegionAsDeletedService(id: string) {
    const region = await markAsDeleted(RegionModel, new Types.ObjectId(id));
    return region;
}

export async function getRegionByIdService(id: string) {
    const region = await findById(RegionModel, id);
    if (!region) throw RegionError.NotFound(id);
    return region;
}

export async function getRegionsPagingService(dto: RegionGetDto) {
    const query: any = {
        isDeleted: false
    }

    if (dto.search) {
        query.name = {
            $regex: dto.search,
            $options: 'i'
        }
    }


    const regions = await findPagin(RegionModel, query, dto, [])
    return regions;
}