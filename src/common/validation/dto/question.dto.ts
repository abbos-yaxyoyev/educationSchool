import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsNotEmptyObject, IsOptional, ValidateNested } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";
class ContentDto {
    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    title!: TranslationDto;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    image: TranslationDto;
}


class AnswerDto extends ContentDto {
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    isCorrect: boolean;
}

export class QuestionDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDto)
    question: ContentDto;

    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
        each: true
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
        each: true
    })
    @Type(() => AnswerDto)
    answers: AnswerDto[];

    @IsOptional({
        groups: [BaseDtoGroup.CREATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE]
    })
    subjectId: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sectionId: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    topicId: string;

    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    testId: string;
}


export class QuestionGetDto extends PagingDto {
    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING,]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    subjectId: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    sectionId: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    topicId: string;


    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.GET]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.GET]
    })
    testId: string;
}