import { Types } from "mongoose";
import { Roles } from "../../common/db/models/moderator/role/role.model";
import { jwtSign } from "../../common/service/auth.service";
import { getRoleByIdService, hasAccess } from "../../moderator/service/role.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { ModeratorDto, ModeratorGetDto } from "../../common/validation/dto/moderator.dto";
import { validateIt } from "../../common/validation/validator";
import { getModeratorByIdService, getModeratorByNumberAndPasswordService, getModeratorsPagingService, markModeratorAsDeletedService, saveModeratorService, updateModeratorService } from "../service/moderator.service";
import md5 from "md5";

export async function createModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.MODERATOR_CREATE);

        const data = await validateIt(request.body, ModeratorDto, BaseDtoGroup.CREATE)
        data.password = md5(data.password)
        const moderator = await saveModeratorService(data);

        return reply.success(moderator._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function updateModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.MODERATOR_UPDATE)

        const data = await validateIt(request.body, ModeratorDto, BaseDtoGroup.UPDATE)
        delete data.password;
        const moderator = await updateModeratorService(data._id, data);

        return reply.success(moderator._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function deleteModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.MODERATOR_DELETE)

        const data = await validateIt(request.params, ModeratorDto, BaseDtoGroup.DELETE)
        await markModeratorAsDeletedService(data._id);

        return reply.success(data._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function getModeratorsPagingHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.MODERATOR);

        const data = await validateIt(request.query, ModeratorGetDto, BaseDtoGroup.GET_PAGING)

        const moderators = await getModeratorsPagingService(data);

        return reply.success(moderators)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getModeratorByIdHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.MODERATOR);

        const data = await validateIt(request.params, ModeratorGetDto, BaseDtoGroup.GET_BY_ID)

        const moderator = await getModeratorByIdService(data._id);

        return reply.success(moderator)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function loginModeratorHandler(request, reply) {
    try {
        const data = await validateIt(request.body, ModeratorDto, BaseDtoGroup.LOGIN);

        const moderator = await getModeratorByNumberAndPasswordService(data.phoneNumber, data.password);

        const token = jwtSign(request, { phoneNumber: moderator.phoneNumber });

        const response: any = moderator.toObject();
        response.token = token;

        return reply.success(response)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function getAccessModeratorHandler(request, reply) {
    const role = await getRoleByIdService(request.moderator.roleId);

    return reply.success(role)
}