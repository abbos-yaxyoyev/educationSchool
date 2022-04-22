import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../../../base.model";
import { Translation } from "../../../translation/translation.model";
import { UserLevel } from "../../../user/type/level/level.model";
import { Subject } from "../../subject.model";
import { Section } from "../section.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.TOPIC
    }
})
@index({
    'name.uz': 1,
    subjectId: 1,
    userLevelId: 1,
    sectionId: 1
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
    'name.ru': 1,
    subjectId: 1,
    userLevelId: 1,
    sectionId: 1
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
    'name.en': 1,
    subjectId: 1,
    userLevelId: 1,
    sectionId: 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    background: true,
    name: 'en'
})
export class Topic extends BaseModel {
    @prop({
        type: () => Translation,
        required: true,
        _id: false
    })
    name: Translation;

    @prop({
        type: Types.ObjectId,
        required: true,
        ref: CollectionNames.USER_LEVEL
    })
    userLevelId: Ref<UserLevel>;

    @prop({
        type: Types.ObjectId,
        required: true,
        ref: CollectionNames.SUBJECT
    })
    subjectId: Ref<Subject>;

    @prop({
        type: Types.ObjectId,
        ref: CollectionNames.SECTION
    })
    sectionId: Ref<Section>;
}

export const TopicModel = getModelForClass(Topic);