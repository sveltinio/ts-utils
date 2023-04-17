/**
 * The function checks if an object has a specific property with a specific value.
 *
 * @param {any} obj - The `obj` parameter is the object that we want to check the property value
 * of.
 * @param {string} prop - The `prop` parameter is the name of the property that
 * we want to check in the object.
 * @param {any} value - The `value` parameter is the value that we want to check if it exists
 * in the specified property of the given object.
 *
 * @returns a boolean value. It will return `true` if the `prop` exists in the `obj` and its value
 * is equal to the `value` parameter passed to the function. Otherwise, it will return `false`.
 */
export function checkPropValue(obj: any, prop: any, value: any): boolean {
	return prop in Object(obj) && obj[prop] == value;
}

/**
 * The function checks if a boolean, number, or string value is set or not.
 * @param {T} value - The parameter `value` is of a generic type `T` which can be either a boolean,
 * number or string. It is used to check if a value is set or not based on its type.
 * @returns The function `isValueSet` returns a boolean value. It returns `true` if the input value is
 * set (i.e. not null, undefined, or empty), and `false` otherwise. The specific conditions for each
 * data type are as follows:

export function isValueSet<T extends boolean | number | string>(value: T) {
	switch (typeof value) {
		case 'boolean':
			return true;
		case 'number':
			return value > 0;
		case 'string':
			return isEmpty(value);
	}
}
 */
/**
 * The function checks if all required properties exist and are not empty or undefined in a given
 * object.
 *
 * @param {any} obj - The object that needs to be checked for the presence of required properties.
 * @param {any[]} props - props is an array of strings representing the required properties that
 * need to be checked in the obj parameter.
 *
 * @returns a boolean value. It returns `true` if all the properties in the `props` array are
 * present in the `obj` object and their values are not empty strings, `undefined`, or strings
 * containing the word "undefined". It returns `false` otherwise.
 */
export function checkRequiredProp(obj: any, props: any[]): boolean {
	return props.every(
		(p) => p in obj && obj[p] != '' && obj[p] != undefined && !obj[p].includes('undefined')
	);
}

/**
 * The function converts an object of styles into a string of CSS variables. It takes an object as
 * an argument, and for each key-value pair in the object creates a CSS variable declaration with
 * the key as the variable name and the value as thevariable value.  The declarations are then
 * joined together with semicolons and returned as a single string.
 *
 * @param {object} obj - The `obj` parameter is an object containing key-value pairs of CSS style
 * properties and their corresponding values.
 *
 * @returns The function `stylesObjToCSSVars` returns a string that contains CSS variable
 * declarations in the format `--key:value`.
 */
export function stylesObjToCSSVars(obj: any): string {
	return Object.entries(obj)
		.map(([key, value]) => `--${key}: ${value};`)
		.join(' ');
}
