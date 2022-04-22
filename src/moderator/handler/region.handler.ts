import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getRegionByIdService, getRegionsPagingService, markRegionAsDeletedService, saveRegionService, updateRegionService } from "../../common/service/region.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { RegionDto, RegionGetDto } from "../../common/validation/dto/region.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createRegionHandler(request, reply) {
    try {

        await hasAccess(request.moderator.roleId, Roles.REGION_CREATE)

        const data = await validateIt(request.body, RegionDto, BaseDtoGroup.CREATE)

        const region = await saveRegionService(data);

        return reply.success(region._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function updateRegionHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.REGION_UPDATE)

        const data = await validateIt(request.body, RegionDto, BaseDtoGroup.UPDATE)

        const region = await updateRegionService(data._id, data)

        return reply.success(region._id)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function deleteRegionModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.REGION_DELETE)

        const data = await validateIt(request.params, RegionDto, BaseDtoGroup.DELETE)

        const region = await markRegionAsDeletedService(data._id);

        return reply.success(data._id)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getRegionByIdModeratorHandler(request, reply) {
    try {
        await hasAccess(request.moderator.roleId, Roles.REGION);

        const data = await validateIt(request.params, RegionGetDto, BaseDtoGroup.GET_BY_ID);

        const region = await getRegionByIdService(data._id);

        return reply.success(region)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function getRegionsPagingHandler(request, reply) {
    try {
        hasAccess(request.moderator.roleId, Roles.REGION)

        const data = await validateIt(request.query, RegionGetDto, BaseDtoGroup.GET_PAGING)

        const regions = await getRegionsPagingService(data);

        return reply.success(regions)
    } catch (e) {
        return reply.fail(e);
    }
}