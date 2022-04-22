import { Roles } from "../../../common/db/models/moderator/role/role.model";
import { QuestionError } from "../../../common/db/models/test/question/question.error";
import { TestType } from "../../../common/db/models/test/test.model";
import { getQuestionByTestService, markQuestionAsDeletedService, saveQuestionService, updateQuestionService } from "../../../common/service/test/question.service";
import { getTestByIdService, updateQuestionCountService } from "../../../common/service/test/test.service";
import { BaseDtoGroup } from "../../../common/validation/dto/base.dto";
import { QuestionDto, QuestionGetDto } from "../../../common/validation/dto/question.dto";
import { validateIt } from "../../../common/validation/validator";
import { hasAccess } from "../../service/role.service";
import crypto from 'node:crypto'

export async function createQuestionHandler(request, reply) {

    await hasAccess(request.moderator.roleId, Roles.TEST_UPDATE);

    const data = await validateIt(request.body, QuestionDto, BaseDtoGroup.CREATE);
    data.answers = data.answers.map(answer => {
        return {
            ...answer,
            uuid: crypto.randomBytes(24).toString('hex')
        }
    })

    if (!data.question.title && !data.question.image) throw QuestionError.UnknownError()
    const test = await getTestByIdService(data.testId);

    switch (test.type) {
        case TestType.BLOCK: {
            if (!data.subjectId) throw QuestionError.SubjectIdRequired();
            break;
        }
        case TestType.SUBJECT: {
            data.subjectId = String(test.subjects[0].subjectId).toString();
            data.sectionId = test.subjects[0].sectionId ? String(test.subjects[0].sectionId) : null;
            data.topicId = test.subjects[0].topicId ? String(test.subjects[0].topicId) : null
            break;
        }
        default: {

        }
    }

    const question = await saveQuestionService(data);

    await updateQuestionCountService(data.testId, data.subjectId);

    return reply.success(question._id)
}

export async function updateQuestionHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST_UPDATE);

    const data = await validateIt(request.body, QuestionDto, BaseDtoGroup.UPDATE);

    const test = await getTestByIdService(data.testId);

    switch (test.type) {
        case TestType.BLOCK: {
            break;
        }
        case TestType.SUBJECT: {
            data.subjectId = String(test.subjects[0].subjectId).toString();
            data.sectionId = test.subjects[0].sectionId ? String(test.subjects[0].sectionId) : null;
            data.topicId = test.subjects[0].topicId ? String(test.subjects[0].topicId) : null
            break;
        }
        default: {

        }
    }

    const question = await updateQuestionService(data._id, data);

    return reply.success(question)
}

export async function deleteQuestionHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST_UPDATE)

    const data = await validateIt(request.params, QuestionDto, BaseDtoGroup.DELETE);

    const question = await markQuestionAsDeletedService(data._id);

    await updateQuestionCountService(data.testId, question.subjectId.toString());

    return reply.success(data._id)
}

export async function getTestQuestionsHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST);

    const data = await validateIt(request.params, QuestionGetDto, BaseDtoGroup.GET)

    const questions = await getQuestionByTestService(data.testId);

    return reply.success(questions)
}