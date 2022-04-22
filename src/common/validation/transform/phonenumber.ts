export function convertPhone(phone_number) {
    if (typeof phone_number !== 'string') return phone_number
    return `+${phone_number?.replace(/[^0-9]/g, '')}`
}