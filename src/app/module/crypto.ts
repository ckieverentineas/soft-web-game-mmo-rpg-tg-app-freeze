import * as CryptoJS from 'crypto-js';
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY as string; // Убедитесь, что переменная окружения доступна

export function Decrypt_Data(encryptedData: string): string {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (e) {
        console.error(`Невозможно расшифровать: ${e}`);
        return 'zero';
    }
}

export function Encrypt_Data(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return encryptedData;
}