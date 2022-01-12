const data = {s: 'ok', d: {
    a: 1,
    b: 2,
    c: {e: 2, f:8},
    d: [{v: 2}, {v:3}, {v:4}],
}};

function convertBFS(data, result) {
    for(key in data) {
        result[key] = {};

        if (typeof data[key] == 'string' || typeof data[key] == 'number' || typeof data[key] == 'boolean') {
            result[key]['type'] = typeof data[key];
        }
        else {
            if (data[key].length === undefined) {
                result[key]['type'] = 'json';
                result[key]['property'] = {}; 
                convertBFS(data[key], result[key]['property']);
            }
            else {
                result[key]['type'] = 'ref';
                convertBFS({'item': data[key][0]}, result[key]);
            }
        }
    }
    return {'inputs': result, 'example': data};
}

console.log(convertBFS(data, {}));
