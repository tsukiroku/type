import { Repeat } from "./util";

type _Less<T extends number, U extends number> = 
    T extends 0
        ? U extends 0 ? false : true
        : U extends 0 ? false : _Less<Sub<T, 1>, Sub<U, 1>>;

type _Sqrt<T extends number, U extends number> = Div<Add<Div<T, U>, U>, 2>;


/**
 * @description Add T and U
 * @param T number
 * @param U number
 * 
 * ## Example: 
 * ```ts
 * type add = Add<1, 2>; // 3
 * ```
 */
type Add<T extends number, U extends number> = 
    [...Repeat<T>, ...Repeat<U>] extends { length: infer L }
        ? L : never;

/**
 * @description Subtract T and U
 * @param T number
 * @param U number
 * 
 * ## Example: 
 * ```ts
 * type sub = Sub<3, 2>; // 1
 * ```
 */
type Sub<T extends number, U extends number> =
    Repeat<T> extends [...Repeat<U>, ...infer R]
        ? R extends { length: infer L } ? L : never 
            : never;

/**
 * @description Multiply T and U
 * @param T number
 * @param U number
 * 
 * ## Example: 
 * ```ts
 * type mul = Mul<3, 2>; // 6
 * ```
 */
type Mul<T extends number, U extends number> =
    T extends 0 
        ? 0 : U extends 0
            ? 0 : T extends 1
                //@ts-ignore
                ? U : Add<Mul<T, Sub<U, 1>>, T>;

/**
 * @description Divide T and U
 * @param T number
 * @param U number
 * 
 * ## Example: 
 * ```ts
 * type div = Div<6, 2>; // 3
 * ```
 */
type Div<T extends number, U extends number> = 
    T extends 0
        ? 0 : U extends 0
            ? never : Sub<T, U> extends never
                ? 0 : Add<1, Div<Sub<T, U> extends never ? 0 : Sub<T, U>, U>>;

/**
 * @description Raise T to the power of U
 * @param T number
 * @param U number
 * 
 * ## Example: 
 * ```ts
 * type pow = Pow<3, 5>; // 243
 * ```
 */
type Pow<T extends number, U extends number> = 
    U extends 1
        ? T : U extends 0
        ? T : Mul<T, Pow<T, Sub<U, 1>>>;

/**
 * @description Modulo T and U
 * @param T number
 * @param U number
 * 
 * ## Example: 
 * ```ts
 * type modulo = Modulo<5, 3>; // 2
 * ```
 */        
type Modulo<T extends number, U extends number> =
    _Less<T, U> extends true
        ? T
        : Modulo<Sub<T, U>, U>;

/**
 * @description Square root T
 * @param T number
 * 
 * ## Example: 
 * ```ts
 * type sqrt = Sqrt<81>; // 9
 * ```
 */
type Sqrt<T extends number, U extends number = 0> =
    U extends 0
        ? Sqrt<T, Div<T, 2>> : U extends _Sqrt<T, U>
            ? U : Sqrt<T, _Sqrt<T, U>>;

export type { Add, Sub, Mul, Div, Pow, Modulo, Sqrt, _Less };