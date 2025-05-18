import { AES, HmacSHA256, enc } from "crypto-js";

export default function hash(s1, s2) {
    return HmacSHA256(s1 + s2, s2).toString();
}

export const encrypt = (msg, key) => AES.encrypt(msg, key).toString();
export const decrypt = (msg, key) => AES.decrypt(msg, key).toString(enc.Utf8);
