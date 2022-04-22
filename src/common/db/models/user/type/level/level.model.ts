import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { UserType } from "fastify-jwt";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../../../base.model";
import { Translation } from "../../../translation/translation.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.USER_LEVEL
    }
})
export class UserLevel extends BaseModel {
    @prop({
        required: true,
        ref: CollectionNames.USER_TYPE,
        type: Types.ObjectId
    })
    userTypeId!: Ref<UserType>;

    @prop({
        type: () => Translation,
        required: true,
        _id: false
    })
    name!: Translation;
}

export const UserLevelModel = getModelForClass(UserLevel)