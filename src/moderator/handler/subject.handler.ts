import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getSubjectByIdFullService, getSubjectByIdService, getSubjectPagingService, markSubjectAsDeletedService, saveSubjectService, updateSubjectService } from "../../common/service/subject.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { SubjectDto, SubjectGetDto } from "../../common/validation/dto/subject.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createSubjectHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SUBJECT_CREATE);

    const data = await validateIt(request.body, SubjectDto, BaseDtoGroup.CREATE)

    const subject = await saveSubjectService(data);

    return reply.success(subject._id)
}

export async function updateSubjectHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SUBJECT_UPDATE)

    const data = await validateIt(request.body, SubjectDto, BaseDtoGroup.UPDATE)

    const subject = await updateSubjectService(data._id, data);

    return reply.success(subject._id)
}

export async function deleteSubjectHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SUBJECT_DELETE)

    const data = await validateIt(request.params, SubjectDto, BaseDtoGroup.DELETE)

    const subject = await markSubjectAsDeletedService(data._id);

    return reply.success(data._id)
}

export async function getSubjectByIdHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.SUBJECT)

    const data = await validateIt(request.params, SubjectGetDto, BaseDtoGroup.GET_BY_ID)

    const subject = await getSubjectByIdFullService(data._id)

    return reply.success(subject)
}

export async function getSubjectPagingHandler(request, reply) {

    await hasAccess(request.moderator.roleId, Roles.SUBJECT)

    const data = await validateIt(request.query, SubjectGetDto, BaseDtoGroup.GET_PAGING)

    const subjects = await getSubjectPagingService(data);

    return reply.success(subjects)
}