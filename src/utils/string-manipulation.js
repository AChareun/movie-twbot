/**
 * @param {string} string
 * @returns {string}
 */
const removeAccents = (string) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const accentVowel = ['á', 'é', 'í', 'ó', 'ú'];

    let resultString = string;

    accentVowel.forEach((accVowel, index) => {
        while (resultString.includes(accVowel)) {
            resultString = resultString.replace(accVowel, vowels[index]);
        }
    });

    return resultString;
};

/**
 * @param {string} string
 * @param {string} toRemove
 * @returns {string}
 */
const cleanString = (string, toRemove) => {
    const almostCleanString = string.replace(toRemove, '').toLowerCase().trim();
    const cleanedString = removeAccents(almostCleanString);

    return cleanedString;
};

module.exports = cleanString;
