const vowels = ['a', 'e', 'i', 'o', 'u'];
const accentVowel = ['á', 'é', 'í', 'ó', 'ú'];

const removeAccents = (string) => {
  let resultString = string;

  accentVowel.forEach((accVowel, index) => {
    while (resultString.includes(accVowel)) {
      resultString = resultString.replace(accVowel, vowels[index]);
    }
  });

  return resultString;
};

const standarizeString = (string) => {
  const lowerCaseStr = string.toLowerCase();
  const trimedStr = lowerCaseStr.trim();
  const standarizedString = removeAccents(trimedStr);

  return standarizedString;
};

module.exports = standarizeString;
