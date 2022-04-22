import { IsMongoId, IsOptional } from "class-validator";

export enum BaseDtoGroup {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    DELETE_MANY = 'manyDelete',
    LOGIN = 'login',
    REGISTER = 'register',
    GET = 'get',
    GET_PAGING = 'pagingGet',
    GET_BY_ID = 'byIdGet',
    SET_STATE = 'setState'
}

export class BaseDto {
    @IsMongoId({
        groups: [BaseDtoGroup.UPDATE, BaseDtoGroup.DELETE, BaseDtoGroup.GET_BY_ID, BaseDtoGroup.SET_STATE]
    })
    _id: string;

    @IsOptional({
        groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE, BaseDtoGroup.UPDATE]
    })
    createdBy: string;
}
