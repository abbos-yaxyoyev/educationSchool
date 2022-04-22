import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../base.model";
import { Translation } from "../translation/translation.model";
@modelOptions({
    schemaOptions: {
        collection: CollectionNames.SUBJECT
    }
})
@index({
    name: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'name'
})
@index({
    userLevelIds: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'userLevelIds'
})
@index({
    'name.uz': 1,
    isDeleted: 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    background: true,
    name: 'uz'
})
@index({
    'name.ru': 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    background: true,
    name: 'uz'
})
@index({
    'name.en': 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    background: true,
    name: 'en'
})
export class Subject extends BaseModel {
    @prop({
        required: true,
        type: () => Translation,
        _id: false
    })
    name: Translation;

    @prop({
        required: true,
        trim: true
    })
    image!: string;

    @prop({
        required: true,
        trim: true
    })
    color!: string;

    @prop({
        ref: CollectionNames.USER_LEVEL,
        type: () => [Types.ObjectId],
        default: []
    })
    userLevelIds: Types.ObjectId[];
}

export const SubjectModel = getModelForClass(Subject);