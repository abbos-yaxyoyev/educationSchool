import { getUserLevelPagingService } from "../../common/service/user-level.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { UserLevelGetDto } from "../../common/validation/dto/user-level.dto";
import { validateIt } from "../../common/validation/validator";

export async function getUserLevelsUserHandler(request, reply) {
    const data = await validateIt(request.query, UserLevelGetDto, BaseDtoGroup.GET_PAGING)

    const userLevels = await getUserLevelPagingService(data);

    return reply.success(userLevels)
}