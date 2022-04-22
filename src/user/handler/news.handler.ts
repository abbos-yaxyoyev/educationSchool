import { readNewsService } from "../../common/service/news/news-read.service";
import { getNewsByIdFullService, getNewsPagingService } from "../../common/service/news/news.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { NewsGetDto } from "../../common/validation/dto/news.dto";
import { validateIt } from "../../common/validation/validator";

export async function getNewsPagingUserHandler(request, reply) {
    const data = await validateIt(request.query, NewsGetDto, BaseDtoGroup.GET_PAGING)

    console.log(request.user)
    if (request.user) data.userId = request.user._id.toString();
    const news = await getNewsPagingService(data);

    return reply.success(news);
}

export async function getNewsByIdUserHandler(request, reply) {
    const data = await validateIt(request.params, NewsGetDto, BaseDtoGroup.GET_BY_ID)

    const news = await getNewsByIdFullService(data._id)

    console.log(request.user)
    if (request.user) {
        await readNewsService(
            {
                userId: request.user._id.toString(),
                newsId: data._id
            }
        )
    }

    return reply.success(news)
}
