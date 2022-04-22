import { Roles } from "../../../common/db/models/moderator/role/role.model";
import { getTestByIdFullService, getTestByIdService, getTestsPagingService, markTestAsDeletedService, saveTestService, updateTestService } from "../../../common/service/test/test.service";
import { BaseDtoGroup } from "../../../common/validation/dto/base.dto";
import { TestDto, TestGetDto } from "../../../common/validation/dto/test.dto";
import { validateIt } from "../../../common/validation/validator";
import { hasAccess } from "../../service/role.service";

export async function createTestHandler(request, reply) {

    await hasAccess(request.moderator.roleId, Roles.TEST_CREATE)
    const data = await validateIt(request.body, TestDto, BaseDtoGroup.CREATE);

    const test = await saveTestService(data);

    return reply.success(test._id)
}

export async function updateTestHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST_UPDATE)

    const data = await validateIt(request.body, TestDto, BaseDtoGroup.UPDATE);

    const test = await updateTestService(data._id, data);

    return reply.success(test._id)
}

export async function deleteTestHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST_DELETE)

    const data = await validateIt(request.params, TestDto, BaseDtoGroup.DELETE)

    const test = await markTestAsDeletedService(data._id);

    return reply.success(data._id)
}

export async function getTestByIdHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST)

    const data = await validateIt(request.params, TestDto, BaseDtoGroup.GET_BY_ID)

    const test = await getTestByIdFullService(data._id);

    return reply.success(test)
}

export async function getTestPagingHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST);

    const data = await validateIt(request.query, TestGetDto, BaseDtoGroup.GET_PAGING)

    const tests = await getTestsPagingService(data);

    return reply.success(tests);
}

export async function setTestStatusHandler(request, reply) {
    await hasAccess(request.moderator.roleId, Roles.TEST_UPDATE)

    const data = await validateIt(request.body, TestDto, BaseDtoGroup.SET_STATE);

    const test = await updateTestService(data._id, data);

    return reply.success(test.isAvailable);
}