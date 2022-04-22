import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getSectionByIdService, getSectionPagingService, markSectionAsDeletedService, saveSectionService, updateSectionService } from "../../common/service/section.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { SectionDto, SectionGetDto } from "../../common/validation/dto/section.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createSectionHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SECTION_CREATE);

    const data = await validateIt(request.body, SectionDto, BaseDtoGroup.CREATE)

    const section = await saveSectionService(data);

    return reply.success(section._id)
}

export async function updateSectionHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SECTION_UPDATE)

    const data = await validateIt(request.body, SectionDto, BaseDtoGroup.UPDATE)

    const section = await updateSectionService(data._id, data);

    return reply.success(section._id)
}

export async function deleteSectionHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SECTION_DELETE)

    const data = await validateIt(request.params, SectionDto, BaseDtoGroup.DELETE)

    const section = await markSectionAsDeletedService(data._id);

    return reply.success(data._id)
}

export async function getSectionByIdHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SECTION)

    const data = await validateIt(request.params, SectionGetDto, BaseDtoGroup.GET_BY_ID)

    const section = await getSectionByIdService(data._id)

    return reply.success(section)
}

export async function getSectionPagingHandler(request, reply) {

    await hasAccess(request.moderator.roleId, Roles.SECTION)

    const data = await validateIt(request.query, SectionGetDto, BaseDtoGroup.GET_PAGING)

    const sections = await getSectionPagingService(data);

    return reply.success(sections)
}