import { Roles } from "../../common/db/models/moderator/role/role.model";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { RoleDto, RoleGetDto } from "../../common/validation/dto/role.dto";
import { validateIt } from "../../common/validation/validator";
import { getRoleByIdService, getRoleByPagingService, hasAccess, markRoleAsDeletedService, saveRoleService, updateRoleService } from "../service/role.service";

export async function createRoleModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.ROLE_CREATE)

        const data = await validateIt(request.body, RoleDto, BaseDtoGroup.CREATE)
        const role = await saveRoleService(data);

        return reply.success(role._id);
    } catch (e) {
        return reply.fail(e);
    }
}

export async function updateRoleModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.ROLE_UPDATE)

        const data = await validateIt(request.body, RoleDto, BaseDtoGroup.UPDATE)

        const role = await updateRoleService(data._id, data);

        return reply.success(role._id)

    } catch (e) {
        return reply.fail(e);
    }
}

export async function deleteRoleModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.ROLE_DELETE);

        const data = await validateIt(request.params, RoleDto, BaseDtoGroup.DELETE)

        await markRoleAsDeletedService(data._id);

        return reply.success(data._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function getRoleByIdModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.ROLE);

        const data = await validateIt(request.params, RoleDto, BaseDtoGroup.GET_BY_ID)

        const role = await getRoleByIdService(data._id);

        return reply.success(role)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function getRolesPagingModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.ROLE)

        const data = await validateIt(request.query, RoleGetDto, BaseDtoGroup.GET_PAGING)

        const roles = await getRoleByPagingService(data);

        return reply.success(roles)
    } catch (e) {
        return reply.fail(e);
    }
}