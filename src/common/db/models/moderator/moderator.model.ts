import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../base.model";
import { Role } from "./role/role.model";
@modelOptions({
    schemaOptions: {
        collection: CollectionNames.MODERATOR
    }
})

@index({
    phoneNumber: 1
}, {
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    name: 'phoneNumber',
    background: true
})

@index({
    phoneNumber: 1,
    isDeleted: 1
}, {
    name: 'phoneDeleted',
    background: true
})
export class Moderator extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    phoneNumber: string;

    @prop({
        trim: true,
        required: true
    })
    fullName: string;

    @prop({
        ref: CollectionNames.ROLE,
        type: Types.ObjectId,
        required: true
    })
    roleId: Ref<Role>;

    @prop({
        required: true,
        trim: true
    })
    password: string;

    @prop({
        default: 0
    })
    numberOfTries: number;
}

export const ModeratorModel = getModelForClass(Moderator)