import { Falsy } from './types';
export declare function compact<T>(arr: (T | Falsy)[]): T[];
export declare function difference<T>(a: T[], b: T[], getKey?: (el: T) => string): T[];
export declare function intersection<T>(a: T[], b: T[], getKey?: (el: T) => string): T[];
export declare function unique<T>(arr: T[], getKey?: (el: T) => string): T[];
declare type Expose<T> = T extends (infer R)[] ? R : T;
declare type UnArray<T> = Expose<Expose<Expose<Expose<Expose<Expose<Expose<Expose<Expose<Expose<T>>>>>>>>>>;
declare type Flat<T> = Expose<T>[];
declare type DeepFlat<T> = UnArray<T>[];
export declare function flat<T, U = T>(arr: T[], map?: (el: Expose<T>) => U): Flat<U>;
export declare namespace flat {
    var deep: typeof flatDeep;
}
export declare function flatDeep<T, U = UnArray<T>>(arr: T[], map?: (el: UnArray<T>) => U): DeepFlat<U>;
export {};
