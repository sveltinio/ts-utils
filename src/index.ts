/**
 * It returns true if the value is an empty string, an empty array, or an empty object.
 *
 * @param value - generic type - The value to check if it's empty.
 *
 * @returns a boolean representing if the given value is empty or not.
 */
export function isEmpty<T extends boolean | number | string | any[] | object | undefined | null>(
	value: T
): boolean {
	if (value == null) {
		return true;
	}
	switch (typeof value) {
		case 'undefined':
			return true;
		case 'boolean':
			return value === undefined || value === null || Number.isNaN(value);
		case 'string':
			return !value;
		case 'object':
			return Object.keys(value).length === 0;
		default:
			return true;
	}
}
