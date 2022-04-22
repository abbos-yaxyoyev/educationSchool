import { IsOptional, IsString } from "class-validator";
import { BaseDtoGroup } from "./base.dto";

export class TranslationDto {
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    default!: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    uz?: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    ru?: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    @IsString({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE]
    })
    en?: string;
}