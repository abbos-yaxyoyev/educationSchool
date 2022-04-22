import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { convertPhone } from '../transform/phonenumber';
import { BaseDto, BaseDtoGroup } from './base.dto';
import { PagingDto } from './paging.dto';
export class ModeratorDto extends BaseDto {
    @Transform(({ value }) => convertPhone(value))
    @IsPhoneNumber(null, {
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE, BaseDtoGroup.LOGIN]
    })
    phoneNumber: string;

    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    fullName: string;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    roleId: string;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE, BaseDtoGroup.LOGIN]
    })
    password: string;
}

export class ModeratorGetDto extends PagingDto {

}