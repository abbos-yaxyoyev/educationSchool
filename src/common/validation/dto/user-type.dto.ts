import { IsNotEmptyObject } from "class-validator";
import { BaseDto, BaseDtoGroup } from "./base.dto";
import { PagingDto } from "./paging.dto";
import { TranslationDto } from "./translation.dto";

export class UserTypeDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    name: TranslationDto;
}

export class UserTypeGetDto extends PagingDto {

}