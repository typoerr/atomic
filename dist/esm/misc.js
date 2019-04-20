export function identity(a, ..._rest) {
    return a;
}
export function constant(v) {
    return (..._) => v;
}
/**
 * Check that value is not undefined or null
 */
export function existy(v) {
    return v != null;
}
/**
 * no operation
 */
export function noop(..._) {
    /* no operation */
}
export function range(a, b, c = 1) {
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
//# sourceMappingURL=misc.js.map