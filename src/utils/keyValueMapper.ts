export function requestToKeyValuePair(text: string): Array<Array<string>> {
    const expectedRegEx = new RegExp(/(\w+=\w+\s?)+/, 'gi');
    if (!expectedRegEx.test(text)) {
        throw new Error('Wrong tweet format');
    }
    const extractedParams = text.split(' ').map((param) => param.split('='));
    return extractedParams;
}

export function keyValueToQuery(keyValueArray: Array<Array<string>>): string {
    const stringArray = keyValueArray.map((singleArray) => singleArray.join(''));
    return stringArray.join('&');
}
