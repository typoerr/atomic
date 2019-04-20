import { AnyFunc, Resolve } from './types';
export declare function once<Callback extends AnyFunc>(callback: Callback): (...args: Parameters<Callback>) => ReturnType<Callback>;
export declare function before<Callback extends AnyFunc>(n: number, cb: Callback): (...args: Parameters<Callback>) => ReturnType<Callback> | undefined;
export declare function after<Callback extends AnyFunc>(n: number, cb: Callback): (...args: Parameters<Callback>) => ReturnType<Callback> | undefined;
export declare function delayed<Callback extends AnyFunc>(ms: number, cb: Callback): (...args: Parameters<Callback>) => Promise<ReturnType<Callback>>;
export declare function compose<A extends any[], R>(a: (...args: A) => R): (...args: A) => R;
export declare namespace compose {
    var async: typeof composeAsync;
}
export declare function compose<A extends any[], B, R>(a: (...args: A) => B, b: (b: B) => R): (...args: A) => R;
export declare namespace compose {
    var async: typeof composeAsync;
}
export declare function compose<A extends any[], B, C, R>(a: (...args: A) => B, b: (b: B) => C, c: (c: C) => R): (...args: A) => R;
export declare namespace compose {
    var async: typeof composeAsync;
}
export declare function compose<A extends any[], B, C, D, R>(a: (...args: A) => B, b: (b: B) => C, c: (c: C) => D, d: (d: D) => R): (...args: A) => R;
export declare namespace compose {
    var async: typeof composeAsync;
}
export declare function compose<A extends any[], B, C, D, E, R>(a: (...args: A) => B, b: (b: B) => C, c: (c: C) => D, d: (d: D) => E, e: (e: E) => R): (...args: A) => R;
export declare namespace compose {
    var async: typeof composeAsync;
}
export declare function compose<A extends any[], B, C, D, E, F, R>(a: (...args: A) => B, b: (b: B) => C, c: (c: C) => D, d: (d: D) => E, e: (e: E) => F, f: (f: F) => R): (...args: A) => R;
export declare namespace compose {
    var async: typeof composeAsync;
}
export declare function composeAsync<A extends any[], R>(a: (...args: A) => R): (...args: A) => Promise<Resolve<R>>;
export declare function composeAsync<A extends any[], B, R>(a: (...args: A) => B, b: (b: Resolve<B>) => R): (...args: A) => Promise<Resolve<R>>;
export declare function composeAsync<A extends any[], B, C, R>(a: (...args: A) => B, b: (b: Resolve<B>) => C, c: (c: Resolve<C>) => R): (...args: A) => Promise<Resolve<R>>;
export declare function composeAsync<A extends any[], B, C, D, R>(a: (...args: A) => B, b: (b: Resolve<B>) => C, c: (c: Resolve<C>) => D, d: (d: Resolve<D>) => R): (...args: A) => Promise<Resolve<R>>;
export declare function composeAsync<A extends any[], B, C, D, E, R>(a: (...args: A) => B, b: (b: Resolve<B>) => C, c: (c: Resolve<C>) => D, d: (d: Resolve<D>) => E, e: (e: Resolve<E>) => R): (...args: A) => Promise<Resolve<R>>;
export declare function composeAsync<A extends any[], B, C, D, E, F, R>(a: (...args: A) => B, b: (b: Resolve<B>) => C, c: (c: Resolve<C>) => D, d: (d: Resolve<D>) => E, e: (e: Resolve<E>) => F, f: (f: Resolve<F>) => R): (...args: A) => Promise<Resolve<R>>;
export declare function when<T extends any[], R1, R2 = undefined>(predicate: (...args: T) => boolean, onTrue: (...args: T) => R1, onFalse?: (...args: T) => R2): (...args: T) => R1 | R2;
