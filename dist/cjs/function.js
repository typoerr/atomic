"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("./misc");
function once(callback) {
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
exports.once = once;
function before(n, cb) {
    return (...args) => {
        return --n >= 0 ? cb(...args) : undefined;
    };
}
exports.before = before;
function after(n, cb) {
    return (...args) => {
        return --n > 0 ? undefined : cb(...args);
    };
}
exports.after = after;
function delayed(ms, cb) {
    return (...args) => {
        return new Promise(resolve => {
            const tid = setTimeout(() => {
                clearTimeout(tid);
                resolve(cb(...args));
            }, ms);
        });
    };
}
exports.delayed = delayed;
function compose(...funcs) {
    return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
}
exports.compose = compose;
compose.async = composeAsync;
function composeAsync(...funcs) {
    return funcs.reduceRight((a, b) => (...args) => __awaiter(this, void 0, void 0, function* () { return a(yield b(...args)); }));
}
exports.composeAsync = composeAsync;
function when(predicate, onTrue, onFalse = misc_1.constant(undefined)) {
    return (...args) => {
        if (predicate.apply(undefined, args)) {
            return onTrue.apply(undefined, args);
        }
        else {
            return onFalse.apply(undefined, args);
        }
    };
}
exports.when = when;
//# sourceMappingURL=function.js.map