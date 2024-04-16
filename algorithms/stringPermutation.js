// Returns a complixity of o(n log n) due to the sort function
function checkPermutation(string1, string2) {
    if (string1.length !== string2.length) {
        return false;
    }

    const sortedString1 = string1.split('').sort().join('');
    const sortedString2 = string2.split('').sort().join('');

    return sortedString1 === sortedString2;
}

console.log(checkPermutation('abc', 'bca')); // true
console.log(checkPermutation('abc', 'bcaa')); // false
console.log(checkPermutation('abc', 'bc')); // false
