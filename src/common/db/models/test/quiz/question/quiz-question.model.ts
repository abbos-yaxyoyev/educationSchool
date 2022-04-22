import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel, CollectionNames } from "../../../base.model";
import { TestQuestion } from "../../question/question.model";
import { Quiz } from "../quiz.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.QUIZ_QUESTION
    }
})

@index({
    questionId: 1,
    quizId: 1
}, {
    background: true,
    unique: true,
    name: 'quizQuestionId'
})

export class QuizQuestion extends BaseModel {
    @prop({
        required: true,
        ref: CollectionNames.QUESTION,
        type: Types.ObjectId
    })
    questionId: Ref<TestQuestion>;

    @prop({
        default: undefined,
        type: Types.ObjectId
    })
    answerId: Types.ObjectId;

    @prop({
        default: undefined,
        trim: true
    })
    answerUuid: string;

    @prop({
        required: true,
        ref: CollectionNames.QUIZ,
        type: Types.ObjectId
    })
    quizId: Ref<Quiz>;
}

export const QuizQuestionModel = getModelForClass(QuizQuestion)