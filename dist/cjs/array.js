"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const misc_1 = require("./misc");
function compact(arr) {
    return arr.filter(Boolean);
}
exports.compact = compact;
function difference(a, b, getKey) {
    if (getKey === undefined) {
        return a.filter(el => !b.includes(el));
    }
    const bHash = object_1.idx(b, getKey);
    return a.filter(el => !object_1.has(bHash, getKey(el)));
}
exports.difference = difference;
function intersection(a, b, getKey) {
    if (getKey === undefined) {
        return a.filter(el => b.includes(el));
    }
    const bHash = object_1.idx(b, getKey);
    return a.filter(el => object_1.has(bHash, getKey(el)));
}
exports.intersection = intersection;
function unique(arr, getKey) {
    if (getKey === undefined) {
        return Array.from(new Set(arr));
    }
    return Object.values(object_1.idx(arr, getKey));
}
exports.unique = unique;
function flat(arr, map = misc_1.identity) {
    const callback = (acc, el) => {
        if (Array.isArray(el))
            acc.push.apply(acc, el.map(map));
        else
            acc.push(map(el));
        return acc;
    };
    return arr.reduce(callback, []);
}
exports.flat = flat;
flat.deep = flatDeep;
function flatDeep(arr, map = misc_1.identity) {
    const callback = (acc, el) => {
        if (Array.isArray(el))
            return el.reduce(callback, acc);
        else
            acc.push(map(el));
        return acc;
    };
    return arr.reduce(callback, []);
}
exports.flatDeep = flatDeep;
//# sourceMappingURL=array.js.map