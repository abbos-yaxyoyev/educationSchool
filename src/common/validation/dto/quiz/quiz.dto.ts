import { IsBooleanString, IsEnum, IsMongoId, IsOptional } from "class-validator";
import { QuizStatus } from "../../../db/models/test/quiz/quiz.model";
import { BaseDto, BaseDtoGroup } from "../base.dto";
import { PagingDto } from "../paging.dto";
export class QuizDto extends BaseDto {

}
export class QuizGetDto extends PagingDto {

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    userLevelId: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
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
    sectionId: string

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    topicId: string;


    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    testId: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    userId: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsEnum(QuizStatus, {
        groups: [BaseDtoGroup.GET_PAGING]
    })
    status: QuizStatus;
}