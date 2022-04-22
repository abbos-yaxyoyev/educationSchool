import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../base.model";
import { Translation } from "../translation/translation.model";
import { UserType } from "../user/type/type.model";

export enum ContentType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'img',
    LIST = 'list',
    LINK = 'link'
}
export enum Alignment {
    START = 'left',
    END = 'right',
    CENTER = 'center'
}
export enum ListIndicator {
    DOT = 'dot',
    NUMBER = 'number'
}

interface SelfContaining {
    items: SelfContaining[]
}
class ContentData implements SelfContaining {
    @prop({
        default: undefined
    })
    newLine: boolean;

    @prop({
        enum: ContentType,
        type: String
    })
    type: ContentType;

    @prop({
        default: undefined
    })
    bold: boolean;

    @prop({
        default: undefined
    })
    underline: boolean;

    @prop({
        default: undefined
    })
    italic: boolean;

    @prop({
        default: undefined
    })
    strikethrough: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    value: string;

    @prop({
        default: 14
    })
    size: number;

    @prop({
        enum: Alignment,
        type: String
    })
    align: Alignment;

    @prop({
        default: undefined
    })
    sup: boolean;

    @prop({
        default: undefined
    })
    sub: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    href: string;

    @prop({
        default: undefined
    })
    items: any[];

    @prop({
        default: undefined,
        type: String,
        enum: ListIndicator
    })
    listIndicator: ListIndicator
}

class Content {
    @prop({
        required: true,
        type: () => [ContentData]
    })
    default!: ContentData[];

    @prop({
        default: undefined,
        type: () => [ContentData]
    })
    uz?: ContentData[];

    @prop({
        default: undefined,
        type: () => [ContentData]
    })
    ru?: ContentData[];

    @prop({
        default: undefined,
        type: () => [ContentData]
    })
    en?: ContentData[];
}
@modelOptions({
    schemaOptions: {
        collection: CollectionNames.NEWS
    }
})

@index({
    title: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'title'
})
@index({
    isDeleted: 1
}, {
    background: true,
    name: 'deleted'
})
@index({
    userTypeId: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'userType'
})

export class News extends BaseModel {
    @prop({
        required: true,
        type: () => Translation
    })
    title: Translation;

    @prop({
        required: true,
        trim: true
    })
    image: string;

    @prop({
        required: true,
        type: () => Content
    })
    content: Content;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.USER_TYPE
    })
    userTypeId: Ref<UserType>;

    @prop({
        default: 0
    })
    readCount: number;

    @prop({
        default: false
    })
    isTop: boolean;
}

export const NewsModel = getModelForClass(News)