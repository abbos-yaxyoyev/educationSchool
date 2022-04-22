import { Transform } from "class-transformer";
import { IsDateString, IsNumber, isNumberString, IsOptional, IsString } from "class-validator";
import { NumberToString } from "../transform/number";
import { BaseDto, BaseDtoGroup } from "./base.dto";

export class PagingDto extends BaseDto {
    @Transform(({ value }) => Number(value))
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        groups: [BaseDtoGroup.GET_PAGING]
    })
    limit!: number;

    @Transform(({ value }) => Number(value))
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        groups: [BaseDtoGroup.GET_PAGING]
    })
    page!: number;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsString({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    search?: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsDateString({
        strict: false
    }, {
        groups: [BaseDtoGroup.GET_PAGING]
    })
    updatedAt?: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsString({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    sortBy?: string;

    @Transform(({ value }) => Number(value))
    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    })
    asc?: number;
}