import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../../base.model";
import { Translation } from "../../translation/translation.model";
import { UserLevel } from "../../user/type/level/level.model";
import { Subject } from "../subject.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.SECTION
    }
})
@index({
    name: 1,
    isDeleted: 1,
    subjectId: 1
}, {
    background: true,
    name: 'name'
})
@index({
    'name.uz': 1,
    subjectId: 1,
    userLevelId: 1
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
    userLevelId: 1
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
    userLevelId: 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    background: true,
    name: 'en'
})
export class Section extends BaseModel {
    @prop({
        required: true,
        type: () => Translation
    })
    name: Translation;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.SUBJECT
    })
    subjectId: Ref<Subject>;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.USER_LEVEL
    })
    userLevelId: Ref<UserLevel>
}

export const SectionModel = getModelForClass(Section)