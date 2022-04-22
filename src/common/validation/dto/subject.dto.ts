import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsHexColor, IsMongoId, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";

export class SubjectDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    },
        {
            groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
        })
    @ValidateNested({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
    @Type(() => TranslationDto)
    name: TranslationDto;

    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    image!: string;

    @IsHexColor({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    color!: string;

    @ArrayMinSize(1, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        each: true,
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userLevelIds: string[];
}

export class SubjectGetDto extends PagingDto {
    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.GET]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.GET]
    })
    userLevelId: string;

}