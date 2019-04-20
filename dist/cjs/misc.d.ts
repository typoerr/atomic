export declare function identity<T>(a: T, ..._rest: any[]): T;
export declare function constant<T>(v: T): (..._: any[]) => T;
/**
 * Check that value is not undefined or null
 */
export declare function existy<T>(v: T | null | undefined): v is T;
/**
 * no operation
 */
export declare function noop(..._: any[]): void;
/**
 * create array of numbers from start to end.
 */
export declare function range(end: number): number[];
export declare function range(start: number, end: number, step?: number): number[];
