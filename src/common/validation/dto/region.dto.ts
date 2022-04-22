import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";

export class RegionDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    name: TranslationDto;
}

export class RegionGetDto extends PagingDto {
}