export function isValidPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return /^7\d{10}$/.test(cleaned);
}