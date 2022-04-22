import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getTopicByIdService, getTopicPagingService, markTopicAsDeletedService, saveTopicService, updateTopicService } from "../../common/service/topic.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { TopicDto, TopicGetDto } from "../../common/validation/dto/topic.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createTopicHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TOPIC_CREATE);

    const data = await validateIt(request.body, TopicDto, BaseDtoGroup.CREATE)

    const topic = await saveTopicService(data);

    return reply.success(topic._id)
}

export async function updateTopicHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TOPIC_UPDATE)

    const data = await validateIt(request.body, TopicDto, BaseDtoGroup.UPDATE)

    const topic = await updateTopicService(data._id, data);

    return reply.success(topic._id)
}

export async function deleteTopicHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TOPIC_DELETE)

    const data = await validateIt(request.params, TopicDto, BaseDtoGroup.DELETE)

    const topic = await markTopicAsDeletedService(data._id);

    return reply.success(data._id)
}

export async function getTopicByIdHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TOPIC)

    const data = await validateIt(request.params, TopicGetDto, BaseDtoGroup.GET_BY_ID)

    const topic = await getTopicByIdService(data._id)

    return reply.success(topic)
}

export async function getTopicPagingHandler(request, reply) {

    await hasAccess(request.moderator.roleId, Roles.TOPIC)

    const data = await validateIt(request.query, TopicGetDto, BaseDtoGroup.GET_PAGING)

    const topics = await getTopicPagingService(data);

    return reply.success(topics)
}