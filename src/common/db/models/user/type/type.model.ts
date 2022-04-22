import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { BaseModel, CollectionNames } from "../../base.model";
import { Translation } from "../../translation/translation.model";

export enum DefaultUserTypes {
    PUPIL = 'pupil',
    TEACHER = 'teacher',
    PARENT = 'parent'
}

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.USER_TYPE
    }
})

export class UserType extends BaseModel {
    @prop({
        required: true,
        type: () => Translation,
        _id: false
    })
    name: Translation;

    @prop({
        enum: DefaultUserTypes,
        default: undefined,
        type: String
    })
    type?: DefaultUserTypes;
}

export const UserTypeModel = getModelForClass(UserType);