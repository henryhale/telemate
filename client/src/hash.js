export default function hash(str = "") {
    let j = 9;
    for (let i = 0; i < str.length;) {
        j = Math.imul(j ^ str.charCodeAt(i++), 9 ** 9);        
    }
    return j ^ j >>> 9;
}