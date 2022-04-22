import { Type } from "class-transformer";
import { IsMongoId, IsNotEmptyObject, IsOptional, ValidateNested } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";

export class TopicDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    },
        {
            groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
        })
    @ValidateNested({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
    @Type(() => TranslationDto)
    name: TranslationDto;

    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevelId: string;

    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    subjectId: string;

    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sectionId: string;
}

export class TopicGetDto extends PagingDto {
    @IsOptional({
        groups:[BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    userLevelId: string;

        @IsOptional({
        groups:[BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    subjectId: string;

    @IsOptional({
        groups:[BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    sectionId: string;
}