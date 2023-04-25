/**
 * A bunch of utilities helping with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values | primitive} values and basic objects.
 *
 * @packageDocumentation
 */

/**
 * The function checks if a given value is a boolean.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a boolean, `false` otherwise.
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
export function isBool<T>(value: T): value is T {
	return (
		isDefined(value) &&
		typeof value === 'boolean' &&
		value.constructor === Boolean &&
		(value === true || value === false)
	);
}

/**
 * The function checks if a given value is a number.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a number, `false` otherwise.
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
export function isNumber<T>(value: T): value is T {
	return isDefined(value) && typeof value === 'number' && value.constructor === Number;
}

/**
 * The function checks if a given value is a bigint.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a bigint, `false` otherwise.
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
export function isBigInt<T>(value: T): value is T {
	return isDefined(value) && typeof value === 'bigint' && value.constructor === BigInt;
}

/**
 * The function checks if a given value is a string.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a string, `false` otherwise.
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
export function isString<T>(value: T): value is T {
	return isDefined(value) && typeof value === 'string' && value.constructor === String;
}

/**
 * The function checks if a given value is an array.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is an array, `false` otherwise.
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
	return isDefined(value) && Array.isArray(value);
}

/**
 * The function checks if a given value is an objet.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is an object, `false` otherwise.
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
	return isDefined(value) && (typeof value === 'object' || typeof value === 'function');
}

/**
 * The function checks if a given value is a symbol.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a symbol, `false` otherwise.
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
export function isSymbol<T>(value: T): value is NonNullable<T> {
	return typeof value === 'symbol';
}

/**
 * The function checks if a given value is a {@link https://developer.mozilla.org/en-US/docs/Glossary/Truthy| truthy} value.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a truthy value, `false` otherwise.
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
export function isTruthy<T>(v: T): v is NonNullable<T> {
	return Boolean(v);
}

/**
 * The function checks if a given value is a date.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a date, `false` otherwise.
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
export function isDate<T>(value: T): value is T {
	return (
		isDefined(value) &&
		isObject(value) &&
		value instanceof Date &&
		typeof value.getTime === 'function' &&
		Object.prototype.toString.call(value) === '[object Date]'
	);
}

/**
 * The function checks if a given value is a RegExp object.
 *
 * @typeParam  value - The value to check.
 *
 * @returns Returns `true` if `value` is a RegExp object, `false` otherwise.
 *
 * @example
 * ```
 * isRegExp(/ab+c/)
 * // => true
 *
 * isRegExp(new RegExp("ab+c", "i"))
 * // => true
 *
 * isRegExp(10)
 * // => false
 * ```
 */
export function isRegExp<T>(value: T): value is T {
	return (
		isDefined(value) &&
		isObject(value) &&
		value instanceof RegExp &&
		typeof value.test === 'function' &&
		Object.prototype.toString.call(value) === '[object RegExp]'
	);
}

/**
 * The function checks if a given value is defined and not null.
 * It uses a type guard to narrow down the type of the input value to `T` if it is defined.
 *
 * @typeParam value - The value parameter is a generic type T, which can be any
 * type of value.
 *
 * @returns A boolean value indicating whether the input value is defined (not undefined or
 * null) or not.
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
	return (
		value !== null && typeof value !== 'undefined' && value !== undefined && !Number.isNaN(value)
	);
}

/**
 * The function checks if a value is empty or not.
 *
 * @typeParam value - The value parameter is a generic type T, which can be any type of value.
 *
 * @returns A boolean value indicating whether the input value is empty or not.
 * If the value is null, undefined, NaN, an empty string, or an object with no keys, the
 * function returns true, indicating that the value is empty. Otherwise, it returns false,
 * indicating that the value is not empty.
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
			return !Object.keys(value).length;
		default:
			return true;
	}
}
