import { Document } from "mongoose";
import { UserError } from "../../common/db/models/user/user.error";
import { User } from "../../common/db/models/user/user.model";
import { generateOtp, hashIt, isExpired } from "../../common/service/common.service";
import { sendSms } from "../../common/service/sms.service";

export async function sendUserPasswordService(
    user: Document & User
) {
    const password = generateOtp();
    await sendSms(user.phoneNumber, password);
    const hashedPassword = hashIt(password);
    user.password = hashedPassword;
    return await user.save();
}

export async function checkUserOtpService(user: Document & User, password) {
    if (user.numberOfTries >= 3 && user.blockedAt && !isExpired(user.blockedAt)) throw UserError.Blocked(user.blockedAt)
    if (user.password != hashIt(password)) {
        user.numberOfTries += 1;
        user.blockedAt = new Date();
        await user.save()
        throw UserError.WrongOtp()
    }

    user.blockedAt = undefined;
    user.numberOfTries = 0

    return await user.save();
}