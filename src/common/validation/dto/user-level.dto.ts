import { IsMongoId, IsNotEmptyObject, IsOptional } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";

export class UserLevelDto extends BaseDto {
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    userTypeId!: string;

    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    name!: TranslationDto;
}

export class UserLevelGetDto extends PagingDto {

    @IsOptional({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.GET]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.GET]
    })
    userTypeId: string;
}