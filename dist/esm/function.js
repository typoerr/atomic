var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { constant } from './misc';
export function once(callback) {
    let invoked = false;
    let ret;
    return (...args) => {
        if (!invoked) {
            invoked = true;
            return (ret = callback(...args));
        }
        return ret;
    };
}
export function before(n, cb) {
    return (...args) => {
        return --n >= 0 ? cb(...args) : undefined;
    };
}
export function after(n, cb) {
    return (...args) => {
        return --n > 0 ? undefined : cb(...args);
    };
}
export function delayed(ms, cb) {
    return (...args) => {
        return new Promise(resolve => {
            const tid = setTimeout(() => {
                clearTimeout(tid);
                resolve(cb(...args));
            }, ms);
        });
    };
}
export function compose(...funcs) {
    return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
}
compose.async = composeAsync;
export function composeAsync(...funcs) {
    return funcs.reduceRight((a, b) => (...args) => __awaiter(this, void 0, void 0, function* () { return a(yield b(...args)); }));
}
export function when(predicate, onTrue, onFalse = constant(undefined)) {
    return (...args) => {
        if (predicate.apply(undefined, args)) {
            return onTrue.apply(undefined, args);
        }
        else {
            return onFalse.apply(undefined, args);
        }
    };
}
//# sourceMappingURL=function.js.map