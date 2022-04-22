import { Types } from "mongoose";
import { SectionError } from "../db/models/subject/section/section.error";
import { SectionModel } from "../db/models/subject/section/section.model";
import { SectionGetDto } from "../validation/dto/section.dto";
import { create, findById, findPagin, markAsDeleted, updateOne } from "./base.service";

export async function saveSectionService(data) {
    try {
        const section = await create(SectionModel, data)
        return section;
    } catch (e) {
        if (e.code == 11000) throw SectionError.AlreadyExists(Object.keys(e.keyPattern))
        throw SectionError.UnknownError(e);
    }
}


export async function updateSectionService(id: string, data) {
    try {
        const section = await updateOne(SectionModel, id, data);
        if (!section) throw SectionError.NotFound(id)
        return section;
    } catch (e) {
        if (e.code == 11000) throw SectionError.AlreadyExists(Object.keys(e.keyPattern))
        throw SectionError.UnknownError(e);
    }
}

export async function markSectionAsDeletedService(id: string) {
    await markAsDeleted(SectionModel, new Types.ObjectId(id))
}

export async function getSectionByIdService(id: string) {
    const section = await findById(SectionModel, id);
    if (!section) throw SectionError.NotFound(id);
    return section;
}

export async function getSectionPagingService(dto: SectionGetDto) {
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
            }
        ]
    }

    if (dto.userLevelId) {
        query.userLevelId = new Types.ObjectId(dto.userLevelId)
    }

    if (dto.subjectId) {
        query.subjectId = new Types.ObjectId(dto.subjectId)
    }

    const sections = await findPagin(SectionModel, query, dto, []);

    return sections;
}