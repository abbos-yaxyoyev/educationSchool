import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../base.model";
import { User } from "../../user/user.model";
import { News } from "../news.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.NEWS_READ
    }
})

@index({
    newsId: 1
}, {
    background: true,
    name: 'newsId'
})

@index({
    userId: 1
}, {
    background: true,
    name: 'userId'
})
@index({
    userId: 1,
    newsId: 1
}, {
    background: true,
    name: 'userAndNews',
    unique: true
})

export class NewsRead {
    @prop({
        required: true,
        ref: CollectionNames.NEWS,
        type: Types.ObjectId
    })
    newsId: Ref<News>;

    @prop({
        ref: CollectionNames.USER,
        type: Types.ObjectId,
        required: true
    })
    userId: Ref<User>;
}

export const NewsReadModel = getModelForClass(NewsRead);