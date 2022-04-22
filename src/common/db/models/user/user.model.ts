import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../base.model";
import { Region } from "../region/region.model";
import { UserLevel } from "./type/level/level.model";
import { UserType } from "./type/type.model";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.USER
    }
})

@index({
    phoneNumber: 1
}, {
    name: 'phoneNumber',
    background: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    }
})
export class User extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    phoneNumber!: string;

    @prop({
        required: true,
        trim: true
    })
    firstName!: string;

    @prop({
        default: undefined,
        trim: true
    })
    lastName?: string;

    @prop({
        required: true,
        ref: CollectionNames.REGION,
        type: Types.ObjectId
    })
    regionId!: Ref<Region>;

    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.USER_TYPE
    })
    userTypeId!: Ref<UserType>;

    @prop({
        default: undefined,
        type: Types.ObjectId,
        ref: CollectionNames.USER_LEVEL
    })
    userLevelId?: Ref<UserLevel>;

    @prop({
        enum: Gender,
        type: String,
        default: Gender.MALE,
        required: true
    })
    gender!: Gender;

    @prop({
        required: true
    })
    birthDate!: Date;

    @prop({
        default: undefined,
        trim: true
    })
    image: string;

    //////////////
    //needed for login
    @prop({
        default: undefined,
        trim: true
    })
    password?: string;

    @prop({
        default: undefined
    })
    blockedAt?: Date;

    @prop({
        default: 0
    })
    numberOfTries!: number;
}

export const UserModel = getModelForClass(User);