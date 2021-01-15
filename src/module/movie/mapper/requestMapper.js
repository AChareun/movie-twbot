/**
 * @param {string} text
 * @returns {Array} an array of arrays with params key-value pairs
 */
function requestToKeyValuePair(text) {
    const extractedParams = text.split(' ').map((param) => param.split('='));
    return extractedParams;
}

/**
 * @param {string} text
 * @returns {Array} lowcased and accent-free key-value pairs
 */
function mapRequest(text) {
    return requestToKeyValuePair(text);
}

/**
 * @param {Array} params Array of arrays with key-value
 * @returns {string} string with params ready to be appended to url
 */
function keyValueToQuery(keyValueArray) {
    return keyValueArray.join('').join('&');
}

module.exports = { requestToKeyValuePair, keyValueToQuery, mapRequest };
