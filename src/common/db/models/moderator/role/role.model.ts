import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { BaseModel, CollectionNames } from "../../base.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.ROLE
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
    isDeleted: 1
}, {
    background: true,
    name: 'deleted'
})
export class Role extends BaseModel {

    @prop({
        required: true,
        trim: true
    })
    name: string;

    @prop({
        trim: true,
        default: undefined
    })
    description: string;

    @prop({
        default: false
    })
    region: boolean;

    @prop({
        default: false
    })
    regionCreate: boolean;

    @prop({
        default: false
    })
    regionUpdate: boolean;

    @prop({
        default: false
    })
    regionDelete: boolean;


    @prop({
        default: false
    })
    userType: boolean;

    @prop({
        default: false
    })
    userTypeCreate: boolean;

    @prop({
        default: false
    })
    userTypeUpdate: boolean;

    @prop({
        default: false
    })
    userTypeDelete: boolean;

    @prop({
        default: false
    })
    userLevel: boolean;

    @prop({
        default: false
    })
    userLevelCreate: boolean;

    @prop({
        default: false
    })
    userLevelUpdate: boolean;

    @prop({
        default: false
    })
    userLevelDelete: boolean;

    @prop({
        default: false
    })
    subject: boolean;

    @prop({
        default: false
    })
    subjectCreate: boolean;

    @prop({
        default: false
    })
    subjectUpdate: boolean;

    @prop({
        default: false
    })
    subjectDelete: boolean;

    @prop({
        default: false
    })
    section: boolean;

    @prop({
        default: false
    })
    sectionCreate: boolean;

    @prop({
        default: false
    })
    sectionUpdate: boolean;

    @prop({
        default: false
    })
    sectionDelete: boolean;

    @prop({
        default: false
    })
    topic: boolean;

    @prop({
        default: false
    })
    topicCreate: boolean;

    @prop({
        default: false
    })
    topicUpdate: boolean;

    @prop({
        default: false
    })
    topicDelete: boolean;

    @prop({
        default: false
    })
    test: boolean;

    @prop({
        default: false
    })
    testCreate: boolean;

    @prop({
        default: false
    })
    testUpdate: boolean;

    @prop({
        default: false
    })
    testDelete: boolean;


    @prop({
        default: false
    })
    moderator: boolean;

    @prop({
        default: false
    })
    moderatorCreate: boolean;

    @prop({
        default: false
    })
    moderatorUpdate: boolean;

    @prop({
        default: false
    })
    moderatorDelete: boolean;

    @prop({
        default: false
    })
    role: boolean;

    @prop({
        default: false
    })
    roleCreate: boolean;

    @prop({
        default: false
    })
    roleUpdate: boolean;

    @prop({
        default: false
    })
    roleDelete: boolean;

    @prop({
        default: false
    })
    news: boolean;

    @prop({
        default: false
    })
    newsCreate: boolean;

    @prop({
        default: false
    })
    newsUpdate: boolean;

    @prop({
        default: false
    })
    newsDelete: boolean;
}

export const RoleModel = getModelForClass(Role)

export enum Roles {
    REGION = "region",
    REGION_CREATE = "regionCreate",
    REGION_UPDATE = "regionUpdate",
    REGION_DELETE = "regionDelete",
    USER_TYPE = "userType",
    USER_TYPE_CREATE = "userTypeCreate",
    USER_TYPE_UPDATE = "userTypeUpdate",
    USER_TYPE_DELETE = "userTypeDelete",
    USER_LEVEL = "userLevel",
    USER_LEVEL_CREATE = "userLevelCreate",
    USER_LEVEL_UPDATE = "userLevelUpdate",
    USER_LEVEL_DELETE = "userLevelDelete",
    SUBJECT = "subject",
    SUBJECT_CREATE = "subjectCreate",
    SUBJECT_UPDATE = "subjectUpdate",
    SUBJECT_DELETE = "subjectDelete",
    SECTION = "section",
    SECTION_CREATE = "sectionCreate",
    SECTION_UPDATE = "sectionUpdate",
    SECTION_DELETE = "sectionDelete",
    TOPIC = "topic",
    TOPIC_CREATE = "topicCreate",
    TOPIC_UPDATE = "topicUpdate",
    TOPIC_DELETE = "topicDelete",
    TEST = "test",
    TEST_CREATE = "testCreate",
    TEST_UPDATE = "testUpdate",
    TEST_DELETE = "testDelete",
    MODERATOR = "moderator",
    MODERATOR_CREATE = "moderatorCreate",
    MODERATOR_UPDATE = "moderatorUpdate",
    MODERATOR_DELETE = "moderatorDelete",
    ROLE = "role",
    ROLE_CREATE = "roleCreate",
    ROLE_UPDATE = "roleUpdate",
    ROLE_DELETE = "roleDelete",
    NEWS = "news",
    NEWS_CREATE = "newsCreate",
    NEWS_UPDATE = "newsUpdate",
    NEWS_DELETE = "newsDelete"
}