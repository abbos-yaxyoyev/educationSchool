import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { BaseModel, CollectionNames } from "../base.model";
import { Translation } from "../translation/translation.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.REGION
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
    'name.ru': 1,
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
    'name.en': 1,
    isDeleted: 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    },
    background: true,
    name: 'en'
})

export class Region extends BaseModel {
    @prop({
        required: true,
        type: () => Translation,
        _id: false
    })
    name: Translation;
}

export const RegionModel = getModelForClass(Region)