import { HashMap, Omit, Assign } from './types';
export declare function idx<T>(src: Iterable<T>, key?: (el: T, i: number) => string): HashMap<T>;
export declare function idx<T extends object, K extends keyof T>(src: Iterable<T>, key: K): HashMap<T>;
/**
 * mutable set
 */
export declare function set<T extends object, K extends keyof T>(src: T, key: K, val: T[K]): T;
export declare function set<T extends object, K extends string, V>(src: T, key: K, val: V): Assign<T, {
    [P in K]: V;
}>;
/**
 * mutable delete
 */
export declare function del<T extends object, K extends keyof T>(src: T, key: K): Omit<T, K>;
export declare function has<T extends object, K extends keyof T>(obj: T, key: K): boolean;
export declare function has(obj: object, key: string): boolean;
export declare function hasOwn<T extends object, K extends keyof T>(obj: T, key: K): boolean;
export declare function hasOwn(obj: object, key: string): boolean;
export declare function omit<T extends object, K extends keyof T>(src: T, key: K | K[]): Omit<T, K>;
export declare function pick<T extends object, K extends keyof T>(src: T, key: K | K[]): Pick<T, K>;
export declare function mapValues<T, K extends keyof T, U>(src: T, fn: (value: T[K], key: K, src: Readonly<T>) => U): {
    [P in K]: U;
};
export declare function mapKeys<T, K extends keyof T, U extends string>(src: T, fn: (value: T[K], key: K, src: Readonly<T>) => U): {
    [P in U]: T[K];
};
declare type DeepUnPartial<T> = {
    [K in keyof T]-?: DeepUnPartial<T[K]>;
};
declare type DigResult<T> = T extends string | number | symbol | boolean | null ? T | undefined : T extends DeepUnPartial<infer R> ? R | undefined : T;
export declare function dig<T extends object, R>(src: T, draft: (src: DeepUnPartial<T>) => R): DigResult<R>;
export {};
