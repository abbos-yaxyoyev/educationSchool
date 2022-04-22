import { Types } from "mongoose";
import { RoleError } from "../../common/db/models/moderator/role/role.error";
import { RoleModel } from "../../common/db/models/moderator/role/role.model";
import { create, findById, findPagin, markAsDeleted, updateOne } from "../../common/service/base.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";


export async function saveRoleService(data) {
    try {
        const role = await create(RoleModel, data)
        return role
    } catch (e) {
        if (e.code == 11000) throw RoleError.AlreadyExists(Object.keys(e.keyPattern))
        throw RoleError.UnknownError(e);
    }
}

export async function updateRoleService(id: string, data) {
    try {
        const role = await updateOne(RoleModel, new Types.ObjectId(id), data);
        if (!role) throw RoleError.NotFound(id);
        return role
    } catch (e) {
        if (e.code == 11000) throw RoleError.AlreadyExists(Object.keys(e.keyPattern))
        throw RoleError.UnknownError(e);
    }
}

export async function markRoleAsDeletedService(id: string) {
    try {
        return await markAsDeleted(RoleModel, new Types.ObjectId(id))
    } catch (e) {
        throw RoleError.UnknownError(e)
    }
}
export async function getRoleByIdService(id) {
    const role = await findById(RoleModel, id);
    if (!role) throw RoleError.NotFound(id)
    return role;
}

export async function hasAccess(id: Types.ObjectId, access: string) {
    try {
        const role = await getRoleByIdService(id);
        if (!role[access] || role.isDeleted) throw new Error()
    } catch (e) {
        throw RoleError.NotEnoughPermission()
    }
}

export async function getRoleByPagingService(dto: PagingDto) {
    const query = {
        isDeleted: false
    }

    const $project = {
        $project: {
            _id: 1,
            name: 1,
            description: 1
        }
    }

    const $pipeline = [
        $project
    ]

    const roles = await findPagin(RoleModel, query, dto, $pipeline)

    return roles;
}

