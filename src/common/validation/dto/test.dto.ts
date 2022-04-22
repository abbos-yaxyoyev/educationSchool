import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { PaymentType, TestType } from "../../db/models/test/test.model";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { SubjectDto } from "./subject.dto";
import { TranslationDto } from "./translation.dto";


export class TestSubjectDto {
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    subjectId: string;

    @IsNumber(
        {
            allowNaN: false,
            allowInfinity: false,
            maxDecimalPlaces: 1
        }
        , {
            groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
        }
    )
    mark: number;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sectionId?: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    topicId?: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevelId: string;
}

export class TestDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    name!: TranslationDto;

    @IsEnum(PaymentType, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    paymentType!: PaymentType;

    @IsEnum(TestType, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    type!: TestType;

    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
        each: true
    })
    @ArrayMinSize(1, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => TestSubjectDto)
    subjects!: TestSubjectDto;


    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsDateString(
        {
            strict: true
        },
        {
            groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
        }
    )
    startingDate?: Date;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsDateString(
        {
            strict: true
        },
        {
            groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
        }
    )
    finishingDate?: Date;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    duration: number;

    @IsBoolean({
        groups: [BaseDtoGroup.SET_STATE]
    })
    isAvailable: boolean;
}

export class TestGetDto extends PagingDto {
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
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    userLevelId: string;
    userId: Types.ObjectId
}