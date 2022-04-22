import md5 from 'md5'

export const generateOtp = () => Math.random().toString().substring(2, 6)

export const hashIt = (data: any) => md5(data)

export const isExpired = (time: Date) => {
    if (!time) return true;
    return (new Date()).getTime() - time.getTime() >= 120000;
}