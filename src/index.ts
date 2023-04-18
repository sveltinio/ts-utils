/**
 * The function checks if a given value is empty or not.
 *
 * @param {T} value - The value to be checked for emptiness. It can be of type boolean, number,
 * string, array, object, symbol, undefined, or null.
 *
 * @returns a boolean value indicating whether the input value is empty or not.
 * - If the value is null or undefined, it returns true
 * - If the value is a boolean, it returns the boolean value
 * - If the value is a number, it returns true if the value is NaN
 * - If the value is a string, it returns true if the string is empty
 * - If the value is an array, it returns true if the array has zero lenght
 * - If the value is an object, it returns true if no keys
 * - if the value is a symbol, it returns true if it is "Symbol()"
 */
export function isEmpty<
	T extends boolean | number | string | [] | object | symbol | undefined | null
>(value: T): boolean {
	if (value === null || value === undefined || Number.isNaN(value)) {
		return true;
	}
	switch (typeof value) {
		case 'boolean':
			return value;
		case 'string':
			return !value;
		case 'object':
			if (value.constructor === Object) {
				return Object.keys(value).length === 0;
			} else if (value.constructor === Array) {
				return value.length === 0;
			}
			return true;
		case 'symbol':
			return value.toString() === 'Symbol()';
		default:
			return !value;
	}
}
