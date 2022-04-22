import { getSectionPagingService } from "../../common/service/section.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { SectionGetDto } from "../../common/validation/dto/section.dto";
import { validateIt } from "../../common/validation/validator";

export async function getSectionsUserHandler(request, reply) {
    const data = await validateIt(request.query, SectionGetDto, BaseDtoGroup.GET_PAGING)

    const sections = await getSectionPagingService(data);

    return reply.success(sections)
}