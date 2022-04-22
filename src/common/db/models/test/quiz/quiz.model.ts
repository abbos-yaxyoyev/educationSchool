import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../../base.model";
import { Subject } from "../../subject/subject.model";
import { User } from "../../user/user.model";
import { Test } from "../test.model";
export enum QuizStatus {
    PENDING = 'pending',
    STARTED = 'started',
    FINISHED = 'finished'
}

class QuizSubjects {
    @prop({
        ref: CollectionNames.SUBJECT,
        type: Types.ObjectId
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
        default: 0
    })
    correctAnswerCount: number;

    @prop({
        default: 0
    })
    score: number;
}
@modelOptions({
    schemaOptions: {
        collection: CollectionNames.QUIZ
    }
})

@index({
    userId: 1,
    testId: 1
}, {
    background: true,
    unique: true,
    partialFilterExpression: {
        status: {
            $eq: QuizStatus.PENDING
        }
    }
})
@index({
    userId: 1,
    testId: 1,
    status: 1
}, {
    background: true,
    unique: true,
    partialFilterExpression: {
        status: {
            $eq: QuizStatus.STARTED
        }
    }
})

export class Quiz extends BaseModel {
    @prop({
        required: true,
        ref: CollectionNames.USER,
        type: Types.ObjectId
    })
    userId: Ref<User>;

    @prop({
        default: undefined,
        type: Types.ObjectId,
        ref: CollectionNames.TEST
    })
    testId: Ref<Test>;

    @prop({
        default: undefined
    })
    startedAt: Date;

    @prop({
        default: undefined
    })
    finishedAt: Date;

    @prop({
        default: 0
    })
    score: number;

    @prop({
        enum: QuizStatus,
        type: String,
        default: QuizStatus.PENDING
    })
    status: QuizStatus;

    @prop({
        default: [],
        type: () => QuizSubjects
    })
    subjects: QuizSubjects[];

    @prop({
        default: 0
    })
    maxScore: number;

    @prop({
        default: 0
    })
    percent: number;

    @prop({
        default: 0
    })
    questionCount: number;

    @prop({
        default: 0
    })
    correctAnswerCount: number;
}

export const QuizModel = getModelForClass(Quiz);