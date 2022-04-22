import { Types } from "mongoose";
import { NewsReadModel } from "../../db/models/news/read/news-read.model";
import { countTotal, create, findOne } from "../base.service"
import { updateNewsService } from "./news.service";

export async function readNewsService(data: {
    userId: string,
    newsId: string
}) {
    try {
        const read = await findOne(NewsReadModel, {
            userId: new Types.ObjectId(data.userId),
            newsId: new Types.ObjectId(data.newsId)
        })
        if (!read) await create(NewsReadModel, data);
        const count = await countTotal(NewsReadModel, { newsId: new Types.ObjectId(data.newsId) })
        await updateNewsService(data.newsId, { readCount: count })
    } catch (e) {
        console.log(e)
    }
}