import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getUserLevelByIdService, getUserLevelPagingService, markUserLevelAsDeletedService, saveUserLevelService, updateUserLevelService } from "../../common/service/user-level.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { UserLevelDto, UserLevelGetDto } from "../../common/validation/dto/user-level.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createUserLevelHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_LEVEL_CREATE)

        const data = await validateIt(request.body, UserLevelDto, BaseDtoGroup.CREATE)

        const userLevel = await saveUserLevelService(data);

        return reply.success(userLevel._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function updateUserLevelHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_LEVEL_UPDATE)

        const data = await validateIt(request.body, UserLevelDto, BaseDtoGroup.UPDATE)

        const userLevel = await updateUserLevelService(data._id, data);

        return reply.success(userLevel._id)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function deleteUserLevelHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_LEVEL_DELETE)

        const data = await validateIt(request.params, UserLevelDto, BaseDtoGroup.DELETE)

        await markUserLevelAsDeletedService(data._id);

        return reply.success(data._id)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getUserLevelByIdHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_LEVEL)

        const data = await validateIt(request.params, UserLevelGetDto, BaseDtoGroup.GET_BY_ID)

        const userLevel = await getUserLevelByIdService(data._id);

        return reply.success(userLevel)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getUserLevelPagingHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_LEVEL)

        const data = await validateIt(request.query, UserLevelGetDto, BaseDtoGroup.GET_PAGING)

        const userLevels = await getUserLevelPagingService(data);

        return reply.success(userLevels)
    } catch (e) {
        return reply.fail(e)
    }
}