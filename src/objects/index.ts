/**
 * A bunch of utilities to deal with objects and their key/values pairs.
 *
 * @packageDocumentation
 */

import { ok, err, Result } from 'neverthrow';
import { isArray, isPlainObject, isString } from '../is';

/**
 * Checks if a plain JavaScript object has a specified property.
 *
 * @param obj - The object to check for the specified property.
 * @param prop - The property to check for in the object.
 * @returns A `Result` object with either a boolean indicating whether the object has the specified property, or an `Error` object if the input parameters are invalid.
 *
 * @example
 * ```typescript
 * const myObject = { foo: 'bar', baz: 42 };
 * hasProperty(myObject, 'foo');
 * // => { ok: true, value: 'true' }
 *
 * hasProperty(myObject, 'qux')
 * // => { ok: true, value: 'false' }
 * ```
 *
 *  @example
 * Handle invalid input parameters:
 * ```typescript
 * const user = { name: "John", age: 25 };
 * hasProperty(null, "name");
 * // => { ok: false, error: Error('[objects.hasProperty] Expected a plain javascript object') }
 *
 * hasProperty(user, null);
 * // => { ok: false, error: Error('[objects.hasProperty] Expected an array of property keys') }
 * ```
 */

export function hasProperty<T extends Record<string, any>, K extends PropertyKey>(
	obj: T,
	key: K
): Result<boolean, Error> {
	if (!isPlainObject(obj)) {
		return err(new Error('[objects.hasProperty] Expected a plain javascript object'));
	}

	if (!isString(key)) {
		return err(new Error('[objects.hasProperty] Expected a valid property key'));
	}

	return ok(key in obj);
}

/**
 * Checks if an object has all the specified properties.
 *
 * @remarks
 * This function uses the {@link hasProperty} function to check if the object has each property
 * specified in the `props` array.
 *
 * @param obj - The object to check for the properties.
 * @param props - An array of property keys to check for in the object.
 * @returns A `Result` object with either a `boolean` value indicating whether the object has all
 * the specified properties or not, or an `Error` object if any of the inputs are invalid.
 *
 * @example
 * ```typescript
 * const user = { name: "John", age: 25 };
 * hasProperties(user, ["name", "age"]);
 * // => { ok: true, value: 'true' }
 *
 * hasProperties(user, ["name", "email"]);
 * // => { ok: true, value: 'false' }
 *```
 *
 * @example
 * Handle invalid input parameters:
 * ```typescript
 * const user = { name: "John", age: 25 };
 * hasProperties(null, ["name", "age"]);
 * // => { ok: false, error: Error('[objects.hasProperties] Expected a plain javascript object') }
 *
 * hasProperties(user, null);
 * // => { ok: false, error: Error('[objects.hasProperties] Expected an array of property keys') }
 * ```
 */
export function hasProperties<T extends Record<string, any>, K extends PropertyKey>(
	obj: T,
	keys: Array<K>
): Result<boolean, Error> {
	if (!isPlainObject(obj)) {
		return err(new Error('[objects.hasProperties] Expected a plain javascript object'));
	}

	if (!isArray(keys)) {
		return err(new Error('[objects.hasProperties] Expected an array of object properties'));
	}

	const result = keys.every((key) => {
		const propResult = hasProperty(obj, key);
		if (propResult.isOk()) {
			return propResult.value;
		}
	});

	return ok(result);
}

/**
 * Checks if an object has the specified property with the given value as well as the type is the
 * same.
 *
 * @typeParam T - The type of the object to check
 * @typeParam K - The type of the property to check
 * @param obj - The object to check
 * @param key - The property key to check
 * @param value - The value to compare against the property value
 * @returns A `Result` object with either a boolean indicating whether the property exists
 * and has the specified value and type, or an `Error` object if the property does not exist
 *
 * @example
 * Property exists with matching value and type:
 * ```
 * const obj = { foo: 42, bar: "baz" };
 * hasPropertyValue(obj, "foo", 42);
 * // => { ok: true, value: 'true' }
 *```
 *
 * @example
 * Property exists with non-matching value:
 * ```
 * const obj = { foo: 42, bar: "baz" };
 * hasPropertyValue(obj, "foo", 0);
 * // => { ok: true, value: 'false' }
 * ```
 *
 * @example
 * Property exists with matching type but different value type:
 * ```
 * const obj = { foo: 42, bar: "baz" };
 * hasPropertyValue(obj, "foo", "42");
 * // => { ok: true, value: 'false' }
 * ```
 *
 * @example
 * Property does not exist in the object:
 * ```
 * const obj = { foo: 42, bar: "baz" };
 * hasPropertyValue(obj, "qux", 42);
 * // => { ok: false, error: Error('[objects.hasPropertyValue] Property qux does not exist') }
 * ```
 */
export function hasPropertyValue<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	key: K,
	value: any
): Result<boolean, Error> {
	return hasProperty(obj, key).andThen((propExists) => {
		if (!propExists) {
			return err(new Error(`[objects.hasPropertyValue] Property ${String(key)} does not exist`));
		}

		const propValue = obj[key];

		if (typeof propValue === typeof value && propValue === value) {
			return ok(true);
		} else {
			return ok(false);
		}
	});
}

/**
 * Checks if an object has the specified properties with the given values.
 *
 * @remarks
 * This function uses the {@link hasPropertyValue} function to check if the object has the
 * specified property with the given value as well as the type is the same.
 *
 * @typeParam T - The type of the object to check.
 * @param obj - The object to check for properties.
 * @param propValues - An object whose keys are property names and values are the values to compare against.
 * @returns A `Result` object with either a boolean indicating if all properties exist in the
 * object with the specified values, or an `Error` object  if any of the properties are missing or
 * have different values.
 *
 * @example
 *  Check if person object has name and email properties with the specified values:
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 *   email: string;
 * }
 *
 * const person: Person = {
 *   name: 'John Doe',
 *   age: 30,
 *   email: 'johndoe@example.com',
 * };
 *
 * hasPropertiesWithValue(person, { name: 'John Doe', email: 'johndoe@example.com' });
 * // => { ok: true, value: 'true' }
 * ```
 *
 * @example
 *  Check if person object has name and email properties with different values:
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 *   email: string;
 * }
 *
 * const person: Person = {
 *   name: 'John Doe',
 *   age: 30,
 *   email: 'johndoe@example.com',
 * };
 *
 * hasPropertiesWithValue(person, { name: 'Jane Doe', email: 'janedoe@example.com' });
 * // => { ok: true, value: 'false' }
 *```
 *
 * @example
 * Check if person object has `surname` property with the specified value:
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 *   email: string;
 * }
 *
 * const person: Person = {
 *   name: 'John Doe',
 *   age: 30,
 *   email: 'johndoe@example.com',
 * };
 *
 * hasPropertiesWithValue(person, { surname: 'Doe', age: 40 });
 *  // => { ok: false, error: Error('[objects.hasPropertyValue] Property surname does not exist') }
 * ```
 *

 */
export function hasPropertiesWithValue<T extends Record<string, any>>(
	obj: T,
	propValues: Partial<{ [P in keyof T]: T[P] }>
): Result<boolean, Error> {
	const entries = Object.entries(propValues);

	const checks = entries.map(([key, value]) => hasPropertyValue(obj, key, value));

	const failedChecks = checks.filter((check) => check.isErr());
	if (failedChecks.length > 0) {
		return failedChecks[0];
	}
	const successChecks = checks.filter((check) => check._unsafeUnwrap() === false);
	if (successChecks.length > 0) {
		return ok(false);
	}
	return ok(true);
}

/**
 * Gets the value of a property on an object.
 *
 * @typeParam T - The type of the object to get the property from.
 * @param obj - The object to get the property from.
 * @param prop - The property key to get the value of.
 * @returns The value of the property, or `undefined` if it doesn't exist.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: 123 } };
 * getPropertyValue(obj, 'a.b');
 * // =>  123
 *
 * const obj2 = { a: { b: null } };
 * getPropertyValue(obj2, 'a.b.c');
 * //  => undefined
 * ```
 */
export function getPropertyValue<T>(obj: T, prop: PropertyKey): any {
	const parts = String(prop).split('.');
	let value: any = obj;
	for (const part of parts) {
		if (value == null) {
			return undefined;
		}
		value = value[part];
	}
	return value;
}

/**
 * Returns a CSS variable string from a plain object with key-value pairs.
 *
 * @remarks
 * This function uses `Object.entries()` and `Array.map()` to generate a string
 * with CSS variable declarations. The object keys are expected to be strings,
 * while the values can be of any type. If the input object is not a plain object,
 * an error is returned.
 *
 * @typeParam T - The type of the input object.
 * @param obj - The object to convert to a CSS variable string.
 * @returns A `Result` object with either the CSS variable string, or an `Error` object is the given
 * object is not a plain javascript object.
 *
 * @example
 * ```typescript
 * const obj = { primaryColor: '#f00', secondaryColor: '#0f0', fontSize: '16px' };
 * mapToCssVars(obj)
 * // => { ok: true, value: '--primaryColor: #f00; --secondaryColor: #0f0; --fontSize: 16px;' }
 *```
 *
 * @example
 * ```typescript
 * mapToCssVars('a')
 * // => { ok: false, error: Error('[objects.mapToCssVars] Expected a plain javascript object') }
 * ```
 */
export function mapToCssVars<T extends Record<PropertyKey, any>>(obj: T): Result<string, Error> {
	if (!isPlainObject(obj)) {
		return err(new Error('[objects.mapToCssVarsString] Expected a plain javascript object'));
	}

	return ok(
		Object.entries(obj)
			.map(([key, value]) => `--${key}: ${value};`)
			.join(' ')
	);
}
