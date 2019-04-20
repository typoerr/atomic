export function idx(src, key = (_, i) => i) {
    const map = typeof key === 'function' ? key : (el) => el[key];
    const transform = (acc, el, i) => {
        acc[map(el, i)] = el;
        return acc;
    };
    return Array.from(src).reduce(transform, {});
}
export function set(src, key, val) {
    src[key] = val;
    return src;
}
/**
 * mutable delete
 */
export function del(src, key) {
    delete src[key];
    return src;
}
export function has(obj, key) {
    try {
        return key in obj;
    }
    catch (error) {
        return false;
    }
}
export function hasOwn(obj, key) {
    try {
        return obj.hasOwnProperty(key);
    }
    catch (error) {
        return false;
    }
}
export function omit(src, key) {
    src = Object.assign({}, src);
    const keys = Array.isArray(key) ? key : [key];
    return keys.reduce((acc, key) => del(acc, key), Object.assign({}, src));
}
export function pick(src, key) {
    const keys = Array.isArray(key) ? key : [key];
    return keys.reduce((acc, k) => set(acc, k, src[k]), {});
}
export function mapValues(src, fn) {
    const result = {};
    for (const key in src) {
        result[key] = fn(src[key], key, src);
    }
    return result;
}
export function mapKeys(src, fn) {
    const result = {};
    for (const k in src) {
        const v = src[k];
        const _k = fn(v, k, src);
        result[_k] = v;
    }
    return result;
}
export function dig(src, draft) {
    let result;
    const get = (target, key) => {
        result = target[key];
        const next = result == null || typeof result !== 'object' ? {} : result;
        return new Proxy(next, { get });
    };
    draft(new Proxy(src, { get }));
    return result;
}
//# sourceMappingURL=object.js.map