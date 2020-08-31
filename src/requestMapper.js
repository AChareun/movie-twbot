const standarizeString = require('./utils/string-manipulation');

/**
 * @param {string} text
 * @returns {Array} an array of arrays with params key-value pairs
 */
function requestToKeyValue(text) {
  const extractedParams = text.split('/').map((param) => param.split(':'));
  return extractedParams;
}

/**
 * @param {string} text
 * @returns {Array} lowcased and accent-free key-value pairs
 */
function mapRequest(text) {
  const plainText = standarizeString(text);

  return requestToKeyValue(plainText);
}

module.exports = mapRequest;
