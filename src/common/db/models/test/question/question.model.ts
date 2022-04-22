import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { BaseModel, CollectionNames } from "../../base.model";
import { Translation } from "../../translation/translation.model";
import crypto from 'node:crypto'
import { Types } from "mongoose";
import { Subject } from "../../subject/subject.model";
import { Section } from "../../subject/section/section.model";
import { Topic } from "../../subject/section/topic/topic.model";

class Question {
    @prop({
        type: () => Translation,
        _id: false
    })
    title: Translation;

    @prop({
        type: () => Translation,
        _id: false
    })
    image: Translation;
}


class Answer extends Question {
    @prop({
        default: crypto.randomUUID()
    })
    uuid: string;

    @prop({
        default: false
    })
    isCorrect: boolean;
}
@modelOptions({
    schemaOptions: {
        collection: CollectionNames.QUESTION
    }
})
@index({
    subjectId: 1
},
    {
        background: true,
        name: 'subject'
    })
@index({
    sectionId: 1
},
    {
        background: true,
        name: 'section'
    })
@index({
    topicId: 1
},
    {
        background: true,
        name: 'topic'
    })
@index({
    testId: 1
},
    {
        background: true,
        name: 'test'
    })
export class TestQuestion extends BaseModel {
    @prop({
        required: true,
        type: () => Question,
        _id: false
    })
    question: Question;

    @prop({
        required: true,
        _id: true,
        type: () => [Answer]
    })
    answers: Answer[];

    @prop({
        ref: CollectionNames.SUBJECT,
        required: true,
        type: Types.ObjectId
    })
    subjectId: Ref<Subject>;

    @prop({
        ref: CollectionNames.SECTION,
        type: Types.ObjectId
    })
    sectionId: Ref<Section>;

    @prop({
        ref: CollectionNames.TOPIC,
        type: Types.ObjectId
    })
    topicId: Ref<Topic>;

    @prop({
        ref: CollectionNames.TEST,
        type: Types.ObjectId,
        required: true
    })
    testId: Ref<TestQuestion>;

    @prop({
        default: false
    })
    isAvailable: boolean;
}

export const QuestionModel = getModelForClass(TestQuestion);