"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(a, ..._rest) {
    return a;
}
exports.identity = identity;
function constant(v) {
    return (..._) => v;
}
exports.constant = constant;
/**
 * Check that value is not undefined or null
 */
function existy(v) {
    return v != null;
}
exports.existy = existy;
/**
 * no operation
 */
function noop(..._) {
    /* no operation */
}
exports.noop = noop;
function range(a, b, c = 1) {
    const [start, end] = arguments.length === 1 ? [0, a] : [a, b];
    const step = c === 0 ? c : Math.sign(end - start) >= 0 ? Math.abs(c) : Math.abs(c) * -1;
    let current = start;
    const result = [];
    const comparator = director(start, end, step, result);
    while (comparator(current)) {
        result.push(current);
        current += step;
    }
    return result;
    function director(start, end, step, result) {
        if (step === 0)
            return () => result.length + 1 < end;
        if (start <= end)
            return (cur) => cur < end;
        return (cur) => cur > end;
    }
}
exports.range = range;
//# sourceMappingURL=misc.js.map