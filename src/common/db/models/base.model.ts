import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Moderator } from "./moderator/moderator.model";
import { User } from "./user/user.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class BaseModel {
    @prop({
        default: false
    })
    isDeleted: boolean;

    @prop({
        default: false
    })
    isCompletelyDeleted: boolean;

    @prop({
        type: Types.ObjectId,
        default: undefined
    })
    createdBy: Ref<User | Moderator>;

    @prop({
        type: Types.ObjectId,
        default: undefined
    })
    updatedBy: Ref<User | Moderator>

    @prop({
        type: Types.ObjectId,
        default: undefined
    })
    deletedBy: Ref<User | Moderator>
}

export enum CollectionNames {
    USER = 'users',
    REGION = 'regions',
    USER_TYPE = 'userTypes',
    USER_LEVEL = 'userLevels',
    SUBJECT = 'subjects',
    SECTION = 'sections',
    TOPIC = 'topics',
    ROLE = 'roles',
    NEWS = 'news',
    TEST = 'tests',
    MODERATOR = 'moderators',
    QUESTION = 'questions',
    QUIZ = 'quizzes',
    QUIZ_QUESTION = 'quizQuestions',
    NEWS_READ = 'newsReads'
}