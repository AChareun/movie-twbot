/**
 * @param {string} text
 * @returns {Array<Array>} an array of arrays with params key-value pairs
 */
function requestToKeyValuePair(text) {
    const extractedParams = text.split(' ').map((param) => param.split('='));
    return extractedParams;
}

/**
 * @param {Array<Array>} keyValueArray Array of arrays with key-value
 * @returns {string} string with params ready to be appended to url
 */
function keyValueToQuery(keyValueArray) {
    return keyValueArray.join('').join('&');
}

module.exports = { requestToKeyValuePair, keyValueToQuery };
