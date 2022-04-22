import { getTopicPagingService } from "../../common/service/topic.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { TopicGetDto } from "../../common/validation/dto/topic.dto";
import { validateIt } from "../../common/validation/validator";

export async function getTopicsUserHandler(request, reply) {
    const data = await validateIt(request.query, TopicGetDto, BaseDtoGroup.GET_PAGING)

    const topics = await getTopicPagingService(data);

    return reply.success(topics)
}