import { Types } from "mongoose";
import { QuestionError } from "../../db/models/test/question/question.error";
import { QuestionModel } from "../../db/models/test/question/question.model";
import { TestError } from "../../db/models/test/test.error";
import { countTotal, create, markAsDeleted, updateOne } from "../base.service";

export async function saveQuestionService(data) {
    try {
        const question = await create(QuestionModel, data);
        return question
    } catch (e) {
        if (e.code == 11000) throw QuestionError.AlreadyExists(Object.keys(e.keyPattern))
        throw QuestionError.UnknownError(e)
    }
}


export async function updateQuestionService(id: string, data) {
    try {
        const question = await updateOne(QuestionModel, id, data);
        if (!question) throw QuestionError.NotFound(id)
        return question
    } catch (e) {
        if (e.code == 11000) throw QuestionError.AlreadyExists(Object.keys(e.keyPattern))
        throw QuestionError.UnknownError(e)
    }
}

export async function markQuestionAsDeletedService(id: string) {
    return await markAsDeleted(QuestionModel, new Types.ObjectId(id))
}

export async function getQuestionByTestService(testId: string) {
    const query = {
        isDeleted: false,
        testId: new Types.ObjectId(testId)
    };

    const data = await QuestionModel.find(query);

    return data;
}

export async function getTotalQuestionsService(data){
    return await countTotal(QuestionModel, data)
}