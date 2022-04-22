import { getUserTypePagingService } from "../../common/service/user-type.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { UserTypeGetDto } from "../../common/validation/dto/user-type.dto";
import { validateIt } from "../../common/validation/validator";

export async function getUserTypesUserHandler(request, reply) {
    const data = await validateIt(request.query, UserTypeGetDto, BaseDtoGroup.GET_PAGING)

    const userTypes = await getUserTypePagingService(data)

    return reply.success(userTypes)
}