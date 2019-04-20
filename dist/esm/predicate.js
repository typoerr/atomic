export function conforms(predmap) {
    return function test(val) {
        try {
            for (const k in predmap) {
                const v = val[k];
                if (!(k in val) || !predmap[k](v)) {
                    return false;
                }
            }
            return true;
        }
        catch (_a) {
            return false;
        }
    };
}
export function and(...predicates) {
    return function test(val) {
        try {
            for (let i = 0; i < predicates.length; i++) {
                if (!predicates[i](val))
                    return false;
            }
            return true;
        }
        catch (_a) {
            return false;
        }
    };
}
export function or(...predicates) {
    return function test(val) {
        try {
            for (let i = 0; i < predicates.length; i++) {
                if (predicates[i](val))
                    return true;
            }
            return false;
        }
        catch (_a) {
            return false;
        }
    };
}
export function not(f) {
    return (...val) => !Boolean(f(...val)); // eslint-disable-line
}
export function isString(value) {
    return typeof value === 'string';
}
export function isNumber(value) {
    return typeof value === 'number';
}
export function isUndef(value) {
    return value === undefined;
}
export function isNull(value) {
    return value === null;
}
export function isVoid(value) {
    return value === undefined || value === null;
}
export function isBool(value) {
    return typeof value === 'boolean';
}
export function isSymbol(value) {
    return typeof value === 'symbol';
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isPlain(obj) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
}
export function isObject(obj) {
    return obj === Object(obj);
}
export function isDate(value) {
    return value instanceof Date;
}
export function isErr(value) {
    return value instanceof Error;
}
export function isMap(value) {
    return value instanceof Map;
}
export function isSet(value) {
    return value instanceof Set;
}
export function isWeakMap(value) {
    return value instanceof WeakMap;
}
export function isWeakSet(value) {
    return value instanceof WeakSet;
}
export function isFunc(value) {
    return typeof value === 'function';
}
export function isEmpty(value) {
    const v = value;
    switch (typeof v) {
        case 'number':
        case 'boolean':
        case 'undefined':
            return true;
        case 'string':
        case 'symbol':
        case 'function':
        case 'object':
            if (isNull(v)) {
                return true;
            }
            // Array / ArrayLike / Map / Set / string
            if (v[Symbol.iterator]) {
                return Array.from(v).length <= 0;
            }
            // the others object
            return Object.keys(v).length <= 0;
        default:
            return false;
    }
}
//# sourceMappingURL=predicate.js.map