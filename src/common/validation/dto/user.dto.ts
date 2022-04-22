import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserLevel } from "../../db/models/user/type/level/level.model";
import { Gender } from "../../db/models/user/user.model";
import { convertPhone } from "../transform/phonenumber";
import { BaseDto, BaseDtoGroup } from "./base.dto";

export class UserDto extends BaseDto {
    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @Transform(({ value }) => convertPhone(value))
    @IsPhoneNumber(null, {
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.LOGIN]
    })
    phoneNumber!: string;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    firstName!: string;

    @IsOptional({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    lastName?: string;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    regionId!: string;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsEnum(Gender, {
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    gender!: Gender;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsDate({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    @Type(() => Date)
    birthDate!: Date;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.LOGIN, BaseDtoGroup.UPDATE]
    })
    password?: string;

    @IsOptional({
        groups: [BaseDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    userTypeId: string;

    @IsOptional({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.REGISTER, BaseDtoGroup.UPDATE]
    })
    image: string;

    userLevel: UserLevel;
}