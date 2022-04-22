import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getUserTypeByIdService, getUserTypePagingService, markUserTypeAsDeletedService, saveUserTypeService, updateUserTypeService } from "../../common/service/user-type.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { UserTypeDto, UserTypeGetDto } from "../../common/validation/dto/user-type.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createUSerTypeHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_TYPE_CREATE);

        const data = await validateIt(request.body, UserTypeDto, BaseDtoGroup.CREATE);
        const userType = await saveUserTypeService(data);

        return reply.success(userType._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function updateUserTypeHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_TYPE_UPDATE);

        const data = await validateIt(request.body, UserTypeDto, BaseDtoGroup.UPDATE)

        const userType = await updateUserTypeService(data._id, data);

        return reply.success(userType._id)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function deleteUserTypeHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_TYPE_DELETE);

        const data = await validateIt(request.params, UserTypeDto, BaseDtoGroup.DELETE)

        const userType = await markUserTypeAsDeletedService(data._id);

        return reply.success(data._id)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getUserTypeByIdHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_TYPE)
        const data = await validateIt(request.params, UserTypeGetDto, BaseDtoGroup.GET_BY_ID)
        const userType = await getUserTypeByIdService(data._id);
        return reply.success(userType)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getUserTypePagingHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.USER_TYPE)

        const data = await validateIt(request.query, UserTypeGetDto, BaseDtoGroup.GET_PAGING)

        const userTypes = await getUserTypePagingService(data);

        return reply.success(userTypes)
    } catch (e) {
        return reply.fail(e)
    }
}