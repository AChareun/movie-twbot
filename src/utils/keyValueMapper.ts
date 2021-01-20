export function requestToKeyValuePair(text: string): Array<Array<string>> {
    const extractedParams = text.split(' ').map((param) => param.split('='));
    return extractedParams;
}

export function keyValueToQuery(keyValueArray: Array<Array<string>>): string {
    const stringArray = keyValueArray.map((singleArray) => singleArray.join(''));
    return stringArray.join('&');
}
