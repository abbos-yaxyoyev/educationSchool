import { IsMongoId, IsString } from "class-validator";
import { BaseDto, BaseDtoGroup } from "../base.dto";
import { PagingDto } from "../paging.dto";

export class QuizQuestionDto extends BaseDto {
    @IsMongoId({
        groups: [BaseDtoGroup.GET_BY_ID]
    })
    answerId: string;

    @IsString({
        groups: [BaseDtoGroup.GET_BY_ID]
    })
    answerUuid: string;
}

export class QuizQuestionGetDto extends PagingDto {

}