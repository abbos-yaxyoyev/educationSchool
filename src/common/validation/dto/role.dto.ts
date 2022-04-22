import { IsBoolean, IsOptional, IsString } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";

export class RoleDto extends BaseDto {
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    name: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    description: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    region: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    regionCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    regionUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    regionDelete: boolean;


    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userType: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userTypeCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userTypeUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userTypeDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevel: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevelCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevelUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevelDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    subject: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    subjectCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    subjectUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    subjectDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    section: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sectionCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sectionUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sectionDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    topic: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    topicCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    topicUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    topicDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    test: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    testCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    testUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    testDelete: boolean;


    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    moderator: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    moderatorCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    moderatorUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    moderatorDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    role: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    roleCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    roleUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    roleDelete: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    news: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    newsCreate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    newsUpdate: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    newsDelete: boolean;
}

export class RoleGetDto extends PagingDto {

}