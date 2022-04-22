import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUrl, ValidateIf, ValidateNested } from "class-validator";
import { Alignment, ContentType, ListIndicator } from "../../db/models/news/news.model";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";

class ContentDataDto {
    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    newLine: boolean;

    @IsEnum(ContentType, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    type: ContentType;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    bold: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    underline: boolean;


    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    italic: boolean;

    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    strikethrough: boolean;


    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    value: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    size: number;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsEnum(Alignment, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    align: Alignment;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sup: boolean;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    sub: boolean;


    @ValidateIf((data) => data.type == ContentType.LIST, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    items: ContentDataDto[];

    @ValidateIf((data) => data.type == ContentType.LINK, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsUrl({}, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    href: string;

    @ValidateIf((data) => data.type == ContentType.LIST, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsEnum(ListIndicator, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    listIndicator: ListIndicator;
}

class ContentDto {
    @ValidateNested({
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    default: ContentDataDto;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    uz: ContentDataDto;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    ru: ContentDataDto;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    en: ContentDataDto;
}
export class NewsDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    title: TranslationDto;

    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    image: string;

    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => ContentDto)
    content: ContentDto;

    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userTypeId: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    isTop: boolean;
}

export class NewsGetDto extends PagingDto {
    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    userTypeId: string;

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    @IsBoolean({
        groups: [BaseDtoGroup.GET_PAGING]
    })
    isTop: boolean
    userId: string;
}