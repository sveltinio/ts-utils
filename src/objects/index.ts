import { Ok, Err, ok, err } from 'neverthrow';

/**
 * The function checks if a given value is a plain object.
 *
 * @param {T} value - The value to be checked if it is a plain object.
 *
 * @returns A boolean value indicating whether the input value is a plain object or not.
 */
export function isPlainObject<
	T extends boolean | number | string | any[] | object | symbol | undefined | null
>(value: T): boolean {
	return value != null && typeof value === 'object' && value.constructor === Object;
}

/**
 * Thie function checks if a given object has a specified property with a specified value.
 *
 * @param {any} obj - The object to check the property value in.
 * @param {any} prop - The `prop` parameter is a property/key of the `obj` parameter that we want to
 * check the value of.
 * @param {any} value - The value parameter is the value that we want to check if it matches the
 * value of the property in the object.
 *
 * @returns Returns either an `Err` containing an `Error` object if the input `obj` is not
 * a plain javascript object, or an `Ok` containing a boolean value indicating whether the
 *  input `obj` has a property `prop` with the value `value`.
 */
export function checkPropValue(
	obj: any,
	prop: any,
	value: any
): Err<never, Error> | Ok<boolean, never> {
	if (!isPlainObject(obj)) {
		return err(new Error('Expected a plain javascript object'));
	}

	return ok(prop in Object(obj) && obj[prop] == value);
}

/**
 * The function checks if a plain JavaScript object has all the required properties and
 * returns an error if it doesn't.
 *
 * @param {any} obj - The object that needs to be checked for the presence of required properties.
 * @param {any[]} props - props is an array of strings representing the required properties that
 * should exist in the obj parameter. The function checks if all the properties in the props array
 * exist in the obj parameter and are not empty, undefined, or contain the string 'undefined'.
 *
 * @returns Returns either an `Err` containing an `Error` object if the `obj` parameter is not a
 * plain javascript object, or an `Ok` containing a boolean value indicating whether all the
 * properties in the `props` array are present and not empty or undefined in the `obj` parameter.
 */
export function checkRequiredProp(obj: any, props: any[]): Err<never, Error> | Ok<boolean, never> {
	if (!isPlainObject(obj)) {
		return err(new Error('Expected a plain javascript object'));
	}

	return ok(
		props.every(
			(p) => p in obj && obj[p] != '' && obj[p] != undefined && !obj[p].includes('undefined')
		)
	);
}

/**
 * The function converts a plain JavaScript object into a string of CSS variables.
 *
 * @param {any} obj - The `obj` parameter is expected to be a plain JavaScript object containing
 * key-value pairs that will be converted into CSS variables.
 *
 * @returns Returns either an `Err` containing an `Error` object if the input `obj` is not
 * a plain javascript object, or an `Ok` containing a string of CSS variable declarations created
 * from the key-value pairs of the input `obj`.
 */
export function objToCssVars(obj: any): Err<never, Error> | Ok<string, never> {
	if (!isPlainObject(obj)) {
		return err(new Error('Expected a plain javascript object'));
	}

	return ok(
		Object.entries(obj)
			.map(([key, value]) => `--${key}: ${value};`)
			.join(' ')
	);
}
