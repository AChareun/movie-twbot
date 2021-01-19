const removeAccents = (string: string): string => {
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

export const cleanString = (string: string, toRemove: string): string => {
    const almostCleanString = string.replace(toRemove, '').toLowerCase().trim();
    const cleanedString = removeAccents(almostCleanString);

    return cleanedString;
};
