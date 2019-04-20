import { has, idx } from './object';
import { identity } from './misc';
export function compact(arr) {
    return arr.filter(Boolean);
}
export function difference(a, b, getKey) {
    if (getKey === undefined) {
        return a.filter(el => !b.includes(el));
    }
    const bHash = idx(b, getKey);
    return a.filter(el => !has(bHash, getKey(el)));
}
export function intersection(a, b, getKey) {
    if (getKey === undefined) {
        return a.filter(el => b.includes(el));
    }
    const bHash = idx(b, getKey);
    return a.filter(el => has(bHash, getKey(el)));
}
export function unique(arr, getKey) {
    if (getKey === undefined) {
        return Array.from(new Set(arr));
    }
    return Object.values(idx(arr, getKey));
}
export function flat(arr, map = identity) {
    const callback = (acc, el) => {
        if (Array.isArray(el))
            acc.push.apply(acc, el.map(map));
        else
            acc.push(map(el));
        return acc;
    };
    return arr.reduce(callback, []);
}
flat.deep = flatDeep;
export function flatDeep(arr, map = identity) {
    const callback = (acc, el) => {
        if (Array.isArray(el))
            return el.reduce(callback, acc);
        else
            acc.push(map(el));
        return acc;
    };
    return arr.reduce(callback, []);
}
//# sourceMappingURL=array.js.map