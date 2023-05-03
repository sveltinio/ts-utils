/**
 * A bunch of type guard utilities helping with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values | primitive} values and basic objects.
 *
 * @packageDocumentation
 */

/**
 * Checks if a given value is of boolean type and has a value of `true` or `false`.
 *
 * @typeParam T - The expected type of the boolean value.
 * @param value - The value to be checked.
 * @returns `true` if the given value is of boolean type and has a value of `true` or `false`, `false` otherwise.
 *
 * @example
 * ```
 * isBool(true)
 * // => true
 *
 * isBool('hello')
 * // => false
 * ```
 */
export function isBool<T extends boolean>(value: unknown): value is T {
	return typeof value === 'boolean' && (value === true || value === false);
}

/**
 * Checks if a given value is of number type.
 *
 * @typeParam T - The expected type of the number value.
 * @param value - The value to be checked.
 * @returns `true` if the given value is of number type, `false` otherwise.
 *
 * @example
 * ```
 * isNumber(10)
 * // => true
 *
 * isNumber(hello)
 * // => false
 * ```
 */
export function isNumber<T extends number>(value: unknown): value is T {
	return typeof value === 'number';
}

/**
 * Checks if a given value is of `bigint` type.
 *
 * @typeParam T - The expected type of the value.
 * @param value - The value to be checked.
 * @returns `true` if the given value is of `bigint` type, `false` otherwise.
 *
 * @example
 * ```
 * isBigInt(10n)
 * // => true
 *
 * isBigInt(BigInt(Number.MAX_SAFE_INTEGER))
 * // => true
 *
 * isBigInt(hello)
 * // => false
 * ```
 */
export function isBigInt<T extends bigint>(value: unknown): value is T {
	return typeof value === 'bigint';
}

/**
 * Checks if a given value is of `string` type.
 *
 * @typeParam T - The expected string literal type.
 * @param value - The value to be checked.
 * @returns `true` if the given value is of `string` type, `false` otherwise.
 *
 * @example
 * ```
 * isString('hello')
 * // => true
 *
 * isString(10)
 * // => false
 * ```
 */
export function isString<T extends string>(value: unknown): value is T {
	return typeof value === 'string';
}

/**
 * Checks if a given value is an array.
 *
 * @remarks This function is equivalent to `Array.isArray`.
 *
 * @typeParam T - The element type of the array.
 * @param value - The value to be checked.
 * @returns `true` if the given value is an array, `false` otherwise.
 *
 * @example
 * ```
 * isArray(['hello', 'world])
 * // => true
 *
 * isArray(10)
 * // => false
 * ```
 */
export function isArray<T>(value: T): value is T {
	return Array.isArray(value);
}

/**
 * Checks if a given value is an object.
 *
 * @typeParam T - The type of the object.
 * @param value - The value to be checked.
 * @returns `true` if the given value is an object, `false` otherwise.
 *
 * @example
 * ```
 * isObject({})
 * // => false
 *
 * isObject(['hello', 'world])
 * // => true
 *
 * isObject(10)
 * // => false
 * ```
 */
export function isObject<T>(value: T): value is T {
	return typeof value === 'object' && typeof value !== 'function';
}

/**
 * Checks if a given value is a plain JavaScript object.
 *
 * @remarks
 * A plain object is defined as an object whose prototype is either `null` or `Object.prototype`.
 *
 * @typeParam T - The expected type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the value is a plain JavaScript object, `false` otherwise.
 *
 * @example
 * ```
 * isPlainObject({})
 * // => true
 *
 * isPlainObject({ a: 1 })
 * // => true
 *
 * isPlainObject(new Object())
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 *
 * isPlainObject(undefined)
 * // => false
 *
 * isPlainObject(null)
 * // => false
 *
 * isPlainObject(1)
 * // => false
 *
 * isPlainObject('a')
 * // => false
 *
 * isPlainObject(false)
 * // => false
 *
 * isPlainObject([])
 * // => false
 *
 * isPlainObject(() => {})
 * // => false
 * ```
 */
export function isPlainObject<T extends object = object>(value: unknown): value is T {
	if (!isDefined(value) || typeof value !== 'object' || value === null || Array.isArray(value)) {
		return false;
	}

	const proto = Object.getPrototypeOf(value);
	return proto === null || proto === Object.prototype;
}

/**
 * Checks if a given value is of function type.
 *
 * @remarks This function is only intended to be used with functions that have a known return type.
 * It may not work correctly with functions that return a generic type.
 * @param value - The value to be checked.
 * @typeParam T - The expected return type of the function.
 *  @returns Returns `true` if the value is a function, `false` otherwise.
 *
 * @example
 * ```
 * isFunction(()=> {})
 * // => true
 *
 * isFunction({})
 * // => false
 *
 * isObject(['hello', 'world])
 * // => true
 * ```
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
	return typeof value === 'function';
}

/**
 * Checks if a given value is of type `symbol`.
 *
 * @typeParam T - The expected symbol type.
 * @param value - The value to be checked.
 * @returns `true` if the given value is of type `symbol`, `false` otherwise.
 *
 * @example
 * ```
 * isObject(Symbol('message'))
 * // => true
 *
 * isSymbol(Symbol(10))
 * // => true
 *
 * isSymbol({})
 * // => false
 * ```
 */
export function isSymbol<T extends symbol>(value: unknown): value is T {
	return typeof value === 'symbol';
}

/**
 * Checks if a given value is a valid `Date` object.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the given value is a `Date` object, `false` otherwise.
 *
 * @example
 * ```
 * isDate(new Date('2023-03-16'))
 * // => true
 *
 * isDate(new Date())
 * // => true
 *
 * isDate(true)
 * // => false
 * ```
 */
export function isDate<T>(value: T): value is Extract<T, Date> {
	return value instanceof Date;
}

/**
 * Checks if a given value is a valid `RegExp` object.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the given value is a `RegExp` object, `false` otherwise.
 *
 * @example
 * ```
 * isRegExp(/ab+c/)
 * // => true
 *
 * isRegExp(new RegExp("ab+c", "i"))
 * // => true
 *
 * isRegExp('/test/')
 * // => false
 *
 * isRegExp(10)
 * // => false
 * ```
 */
export function isRegExp<T extends RegExp = RegExp>(value: unknown): value is T {
	return value instanceof RegExp;
}

/**
 * Checks if a given value is defined or not.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked for definedness.
 * @returns `true` if the given value is defined, and `false` otherwise.
 *
 * @example
 * ```
 * isDefined(null)
 * // =>false
 *
 * isDefined(undefined)
 * // => false
 *
 * isDefined(NaN)
 * // =>false
 *
 * isDefined(true)
 * // => true
 *
 * isDefined(false)
 * // => true
 *
 * isDefined(0)
 * // => true
 *
 * isDefined(111)
 * // => true
 *
 * isDefined('')
 * // => true
 *
 * isDefined('message')
 * // => true
 *
 * isDefined([])
 * // => true
 *
 * isDefined({})
 * // => true
 *
 * isDefined({ message: 'hello' })
 * // => true
 *
 * isDefined(function () {}))
 * // => true
 * ```
 */
export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
	if (isObject(value) && Array.isArray(value)) {
		return value.every((v) => !isNullish(v));
	}

	return !isNull(value) && !isUndefined(value) && !Number.isNaN(value);
}

/**
 * Checks if a given value is a {@link https://developer.mozilla.org/en-US/docs/Glossary/Truthy| truthy} value.
 *
 * @typeParam T - The type of the value to check.
 * @param value - The value to be checked.
 * @returns `true` if the value is truthy and not `null` or `undefined`, `false` otherwise.
 *
 * @example
 * ```
 * isTruthy(true)
 * // => true
 *
 * isTruthy([])
 * // => true
 *
 * isTruthy({})
 * // => true
 *
 * isTruthy(false)
 * // => false
 *
 * isTruthy(on)
 * // => false
 * ```
 */
export function isTruthy<T>(value: T): value is NonNullable<T> {
	return !!value;
}

/**
 * Checks if a value is null or undefined.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the value is null or undefined, `false` otherwise.
 *
 * @example
 * ```
 * isNullish(null)
 * // => true
 *
 * isNullish(undefined)
 * // => true
 *
 * isNullish(10)
 * // => false
 * ```
 */
export function isNullish<T>(value: T | null | undefined): value is null | undefined {
	return value === null || value === undefined;
}

/**
 * Checks if a given value is null.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the value is undefined, `false` otherwise.
 *
 * @example
 * ```
 * isNull(null)
 *   // => true
 *
 * isNull(undefined)
 * // => false
 *
 * isNull(10)
 * // => false
 * ```
 */
export function isNull<T>(value: T | null): value is null {
	return value === null;
}

/**
 * Checks if a given value is undefined.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the value is undefined, `false` otherwise.
 *
 * @example
 * ```
 * isUndefined(null)
 *   // => false
 *
 * isUndefined(undefined)
 * // => true
 *
 * isUndefined(10)
 * // => false
 * ```
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
	return value === undefined;
}

/**
 * Checks if a given value is empty or not.
 *
 * @typeParam T - The type of the input value.
 * @param value - The value to be checked.
 * @returns `true` if the given  value is empty, and `false` otherwise.
 *
 * @example
 * ```
 * isEmpty(null)
 * // => true
 *
 * isEmpty(undefined)
 * // => true
 *
 * isEmpty(NaN)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(111)
 * // => true
 *
 * isEmpty('')
 * // => true
 *
 * isEmpty('message')
 * // => false
 *
 * isEmpty([])
 * // => true
 *
 * isEmpty(['apple', 'banana'])
 * // => false
 *
 * isEmpty({})
 * // => true
 *
 * isEmpty({ message: 'hello' })
 * // => false
 * ```
 */
export function isEmpty<T>(value: T): value is T {
	if (!isDefined(value)) {
		return true;
	}
	switch (typeof value) {
		case 'string':
			return !value;
		case 'object':
			if (Array.isArray(value)) {
				return value.length === 0;
			}
			return Object.keys(value).length === 0;
		default:
			return true;
	}
}
