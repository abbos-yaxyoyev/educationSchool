import md5 from "md5";
import { jwtSign } from "../../common/service/auth.service";
import { getUserByIdFullService, getUserByPhoneNumberService, saveUserService, updateUserService } from "../../common/service/user.service";
import { BaseDtoGroup } from "../../common/validation/dto/base.dto";
import { UserDto } from "../../common/validation/dto/user.dto";
import { validateIt } from "../../common/validation/validator";
import { checkUserOtpService, sendUserPasswordService } from "../service/user.service";

export async function registerUserHandler(request, reply) {
    try {
        const data = await validateIt(request.body, UserDto, BaseDtoGroup.REGISTER)

        const user = await saveUserService(data);

        await sendUserPasswordService(user);

        return reply.success(user._id)
    } catch (e) {
        return reply.fail(e);
    }
}


export async function loginUserHandler(request, reply) {
    try {
        const data = await validateIt(request.body, UserDto, BaseDtoGroup.LOGIN);

        const user = await getUserByPhoneNumberService(data.phoneNumber);

        await checkUserOtpService(user, data.password);

        const token = await jwtSign(request, { phoneNumber: user.phoneNumber });

        const response = await getUserByIdFullService(user._id)
        response.token = token;
        return reply.success(response);
    } catch (e) {
        return reply.fail(e);
    }
}

export async function getProfileHandler(request, reply) {
    try {
        const response = await getUserByIdFullService(request.user._id)
        return reply.success(response)
    } catch (e) {
        return reply.fail(e)
    }
}

export async function updateUserHandler(request, reply) {
    try {
        request.body = {
            ...request.body,
            _id: request.user._id.toString()
        }
        const data = await validateIt(request.body, UserDto, BaseDtoGroup.UPDATE);

        Object.keys(data).forEach(key => {
            if (data[key] == undefined) delete data[key]
        });

        if (data.password) data.password = md5(data.password)
        const user = await updateUserService(request.user._id, data);

        return reply.success(user)
    } catch (e) {
        return reply.fail(e);
    }
}

export async function removeProfileImageUserHandler(request, reply) {
    const user = await updateUserService(request.user._id, { image: null });
    return reply.success(user);
}