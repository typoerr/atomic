"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function conforms(predmap) {
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
exports.conforms = conforms;
function and(...predicates) {
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
exports.and = and;
function or(...predicates) {
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
exports.or = or;
function not(f) {
    return (...val) => !Boolean(f(...val)); // eslint-disable-line
}
exports.not = not;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
function isUndef(value) {
    return value === undefined;
}
exports.isUndef = isUndef;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isVoid(value) {
    return value === undefined || value === null;
}
exports.isVoid = isVoid;
function isBool(value) {
    return typeof value === 'boolean';
}
exports.isBool = isBool;
function isSymbol(value) {
    return typeof value === 'symbol';
}
exports.isSymbol = isSymbol;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isPlain(obj) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
}
exports.isPlain = isPlain;
function isObject(obj) {
    return obj === Object(obj);
}
exports.isObject = isObject;
function isDate(value) {
    return value instanceof Date;
}
exports.isDate = isDate;
function isErr(value) {
    return value instanceof Error;
}
exports.isErr = isErr;
function isMap(value) {
    return value instanceof Map;
}
exports.isMap = isMap;
function isSet(value) {
    return value instanceof Set;
}
exports.isSet = isSet;
function isWeakMap(value) {
    return value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;
function isWeakSet(value) {
    return value instanceof WeakSet;
}
exports.isWeakSet = isWeakSet;
function isFunc(value) {
    return typeof value === 'function';
}
exports.isFunc = isFunc;
function isEmpty(value) {
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
exports.isEmpty = isEmpty;
//# sourceMappingURL=predicate.js.map