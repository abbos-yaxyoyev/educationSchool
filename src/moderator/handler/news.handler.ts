import { Roles } from "../../common/db/models/moderator/role/role.model";
import { getNewsByIdFullService, getNewsByIdService, getNewsPagingService, markNewsAsDeletedService, saveNewsService, updateNewsService } from "../../common/service/news/news.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { NewsDto, NewsGetDto } from "../../common/validation/dto/news.dto";
import { validateIt } from "../../common/validation/validator";
import { hasAccess } from "../service/role.service";

export async function createNewsHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.NEWS_CREATE);

    const data = await validateIt(request.body, NewsDto, BaseDtoGroup.CREATE)

    const news = await saveNewsService(data);

    return reply.success(news._id)
}

export async function updateNewsHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.NEWS_UPDATE)

    const data = await validateIt(request.body, NewsDto, BaseDtoGroup.UPDATE)

    const news = await updateNewsService(data._id, data);

    return reply.success(news._id)
}

export async function deleteNewsHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.NEWS_DELETE)

    const data = await validateIt(request.params, NewsDto, BaseDtoGroup.DELETE)

    const news = await markNewsAsDeletedService(data._id);

    return reply.success(data._id)
}

export async function getNewsByIdHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.NEWS)

    const data = await validateIt(request.params, NewsGetDto, BaseDtoGroup.GET_BY_ID)

    const news = await getNewsByIdFullService(data._id)

    return reply.success(news)
}

export async function getNewsPagingHandler(request, reply) {

    await hasAccess(request.moderator.roleId, Roles.NEWS)

    const data = await validateIt(request.query, NewsGetDto, BaseDtoGroup.GET_PAGING)

    const news = await getNewsPagingService(data);

    return reply.success(news)
}