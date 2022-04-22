import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../base.model";
import { Section } from "../subject/section/section.model";
import { Topic } from "../subject/section/topic/topic.model";
import { Subject } from "../subject/subject.model";
import { Translation } from "../translation/translation.model";
import { UserLevel } from "../user/type/level/level.model";
import { Quiz } from "./quiz/quiz.model";

export enum PaymentType {
    FREE = 'free',
    PAID = 'paid'
}

export enum TestType {
    BLOCK = 'block',
    SUBJECT = 'subject'
}
export class TestSubject {
    @prop({
        type: Types.ObjectId,
        required: true,
        ref: CollectionNames.SUBJECT
    })
    subjectId: Ref<Subject>;

    @prop({
        required: true,
        default: 1
    })
    mark: number;

    @prop({
        required: true,
        default: 0
    })
    questionCount: number;

    @prop({
        type: Types.ObjectId,
        default: undefined,
        ref: CollectionNames.SECTION
    })
    sectionId?: Ref<Section>;

    @prop({
        ref: CollectionNames.TOPIC,
        type: Types.ObjectId,
        default: undefined
    })
    topicId?: Ref<Topic>;

    @prop({
        ref: CollectionNames.USER_LEVEL,
        type: Types.ObjectId,
        default: undefined
    })
    userLevelId: Ref<UserLevel>
}
@modelOptions(
    {
        schemaOptions: {
            collection: CollectionNames.TEST
        }
    }
)
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
@index({
    subjects: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'subjects'
})


@index({
    paymentType: 1,
    isDeleted: 1
}, {
    background: true,
    name: 'paymentType'
})
@index({
    isDeleted: 1
}, {
    background: true,
    name: 'isDeleted'
})

export class Test extends BaseModel {
    @prop({
        required: true,
        type: () => Translation
    })
    name!: Translation;

    @prop({
        required: true,
        default: 0
    })
    questionCount!: number;

    @prop({
        enum: PaymentType,
        type: String,
        default: PaymentType.FREE
    })
    paymentType!: PaymentType;

    @prop({
        required: true,
        type: String,
        enum: TestType
    })
    type!: TestType;

    @prop({
        type: () => [TestSubject],
        required: true
    })
    subjects!: TestSubject[];

    @prop({
        default: new Date()
    })
    startingDate?: Date;

    @prop({
        default: undefined
    })
    finishingDate?: Date;

    @prop({
        required: true
    })
    duration: number;

    @prop({
        default: false
    })
    isAvailable: boolean;

    @prop({
        default: 0
    })
    solvedUserCount: number;

    @prop({
        default: 0
    })
    solvingUserCount: number;

    @prop({
        default: 0
    })
    registeredUserCount: number;

    @prop({
        default: 0
    })
    averageResult: number;

    @prop({
        default: 0
    })
    maxScore: number;

    @prop({
        default: 0
    })
    maxResult: number;

    @prop({
        type: Types.ObjectId,
        ref: Quiz
    })
    maxResultId: Ref<Quiz>;
}

export const TestModel = getModelForClass(Test)