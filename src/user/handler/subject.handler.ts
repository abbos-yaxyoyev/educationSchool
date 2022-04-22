import { getSubjectPagingService } from "../../common/service/subject.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { SubjectGetDto } from "../../common/validation/dto/subject.dto";
import { validateIt } from "../../common/validation/validator";

export async function getSubjectsUserHandler(request, reply) {
    const data = await validateIt(request.query, SubjectGetDto, BaseDtoGroup.GET_PAGING)

    const subjects = await getSubjectPagingService(data);

    return reply.success(subjects)
}