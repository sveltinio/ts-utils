/**
 * It returns true if the value is an empty string, an empty array, or an empty object.
 *
 * @param value - generic type - The value to check if it's empty.
 *
 * @returns a boolean representing if the given value is empty or not.
 */
export function isEmpty<
	T extends boolean | number | string | [] | object | symbol | undefined | null
>(value: T): boolean {
	if (value === null || value === undefined) {
		return true;
	}
	switch (typeof value) {
		case 'boolean':
			return Boolean(value);
		case 'number':
			return Number.isNaN(value);
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
			return true;
	}
}
