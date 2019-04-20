"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function idx(src, key = (_, i) => i) {
    const map = typeof key === 'function' ? key : (el) => el[key];
    const transform = (acc, el, i) => {
        acc[map(el, i)] = el;
        return acc;
    };
    return Array.from(src).reduce(transform, {});
}
exports.idx = idx;
function set(src, key, val) {
    src[key] = val;
    return src;
}
exports.set = set;
/**
 * mutable delete
 */
function del(src, key) {
    delete src[key];
    return src;
}
exports.del = del;
function has(obj, key) {
    try {
        return key in obj;
    }
    catch (error) {
        return false;
    }
}
exports.has = has;
function hasOwn(obj, key) {
    try {
        return obj.hasOwnProperty(key);
    }
    catch (error) {
        return false;
    }
}
exports.hasOwn = hasOwn;
function omit(src, key) {
    src = Object.assign({}, src);
    const keys = Array.isArray(key) ? key : [key];
    return keys.reduce((acc, key) => del(acc, key), Object.assign({}, src));
}
exports.omit = omit;
function pick(src, key) {
    const keys = Array.isArray(key) ? key : [key];
    return keys.reduce((acc, k) => set(acc, k, src[k]), {});
}
exports.pick = pick;
function mapValues(src, fn) {
    const result = {};
    for (const key in src) {
        result[key] = fn(src[key], key, src);
    }
    return result;
}
exports.mapValues = mapValues;
function mapKeys(src, fn) {
    const result = {};
    for (const k in src) {
        const v = src[k];
        const _k = fn(v, k, src);
        result[_k] = v;
    }
    return result;
}
exports.mapKeys = mapKeys;
function dig(src, draft) {
    let result;
    const get = (target, key) => {
        result = target[key];
        const next = result == null || typeof result !== 'object' ? {} : result;
        return new Proxy(next, { get });
    };
    draft(new Proxy(src, { get }));
    return result;
}
exports.dig = dig;
//# sourceMappingURL=object.js.map