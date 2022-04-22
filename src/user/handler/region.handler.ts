import { getRegionsPagingService } from "../../common/service/region.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { RegionGetDto } from "../../common/validation/dto/region.dto";
import { validateIt } from "../../common/validation/validator";

export async function getRegionsUserHandler(request, reply) {
    const data = await validateIt(request.query, RegionGetDto, BaseDtoGroup.GET_PAGING)
    const regions = await getRegionsPagingService(data);

    return reply.success(regions)
}