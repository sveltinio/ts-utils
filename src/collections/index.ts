import { Result, err, ok } from 'neverthrow';
import {
	isArray,
	isBool,
	isDefined,
	isEmpty,
	isNullish,
	isNumber,
	isString,
	isUndefined
} from '../is/index.js';
import { getPropertyValue } from '../objects/index.js';

/**
 * A bunch of utilities to deal with collections.
 *
 * @packageDocumentation
 */

/**
 * A type representing a group of items. */
export type GroupedObject<T> = {
	group: string;
	items: T[] | Partial<T>[];
};

/**
 * Sorts an array of objects by a given property in ascending or descending order.
 *
 * @remarks
 * This function does not mutate the input array.
 *
 * @typeParam T - The type of the objects in the array.
 * @param arr -The array of objects to sort.
 * @param iteratee - The property to sort the objects by. Can be a dot-separated string to group
 * by a nested property, e.g. "prop1.prop2".
 * @param order - The order to sort the objects in. Defaults to 'asc'. 'desc' for descending order.
 * @returns A `Result` object containing the sorted array on success, or an `Error` object on
 * failure.
 *
 * @throws If the input array is null, undefined, or empty.
 * @throws If the specified property to sort by does not exist in one or more of the objects
 * in the array.
 *
 * @example
 * Sort by age in ascending order:
 * ```typescript
 * const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 40 }
 * ];
 *
 * sortBy(users, 'age', 'asc')
 * // => { ok: true, value: [{ name: 'Bob', age: 20 }, { name: 'John', age: 25 }, { name: 'Alice', age: 30 }] }
 *```
 *
 * @example
 * Sort by name in descending order:
 * ```typescript
 * sortBy(arr, 'name', 'desc')
 * // => { ok: true, value: [{ name: 'John', age: 25 }, { name: 'Bob', age: 20 }, { name: 'Alice', age: 30 }] }
 *```
 *
 * @example
 * Sort by a nested property:
 * ```typescript
 * const arr2 = [
 *   { name: 'John', address: { city: 'New York', state: 'NY' } },
 *   { name: 'Alice', address: { city: 'Los Angeles', state: 'CA' } },
 *   { name: 'Bob', address: { city: 'San Francisco', state: 'CA' } }
 * ];
 *
 * sortBy(arr2, 'address.state', 'asc');
 * // => { ok: true, value: [{ name: 'Alice', address: { city: 'Los Angeles', state: 'CA' } }, { name: 'Bob', address: { city: 'San Francisco', state: 'CA' } }, { name: 'John', address: { city: 'New York', state: 'NY' } }] }
 * ```
 */
export function sortBy<const T extends Record<PropertyKey, any>>(
	arr: T[],
	iteratee: string,
	order: 'asc' | 'desc' = 'asc'
): Result<T[], Error> {
	if (!isDefined(arr) || isEmpty(arr)) {
		return err(new Error('[collections.sortBy] Input must be an array and cannot be empty'));
	}

	if (!isString(iteratee)) {
		return err(new Error('[collections.sortBy] Expected string value for the iteratee parameter'));
	}

	const sort = (arr: T[], iteratee: string) => {
		const propsArray = iteratee.split('.');

		if (isUndefined(propsArray)) return [];

		arr.sort(function (a: any, b: any) {
			propsArray.map((prop: string) => {
				if (!(prop in a && prop in b)) {
					throw new Error(`${iteratee} is not a property of the object!`);
				}
				a = a[prop];
				b = b[prop];
			});
			const res = a > b ? 1 : a < b ? -1 : 0;
			return order === 'asc' ? res : order === 'desc' ? res * -1 : res;
		});
		return arr;
	};

	return ok(sort(arr, iteratee));
}

/**
 * Groups an array of objects by a single key and returns an array of GroupedObjects.
 *
 * @typeParam T - The type of objects in the input array.
 * @param arr - The input array to group.
 * @param key - The key to group the objects by. Can be a dot-separated string to group by nested properties.
 * @param includedProps - An optional array of properties to include in the grouped objects. If specified, only these properties will be included. Defaults to an empty array (all properties will be included).
 * @returns An array of GroupedObjects, each containing a group name and an array of grouped items.
 *
 * @example
 * ```typescript
 * const arr = [
 *   { id: 1, name: 'Alice', age: 30 },
 *   { id: 2, name: 'Bob', age: 25 },
 *   { id: 3, name: 'Charlie', age: 30 }
 * ];
 *
 * groupedByOne(arr, 'age', ['name']);
 * // => { ok: true, value:
 * // [
 * //   { group: '30', items: [{ name: 'Alice' }, { name: 'Charlie' }] },
 * //   { group: '25', items: [{ name: 'Bob' }] }
 * // ]
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * const emptyArr = [];
 * groupedByOne(emptyArr, 'age');
 * // => { ok: false, error: Error('[collections.groupedByOne] Input must be an array and cannot be empty') }
 * ```
 */
export function groupedByOne<T extends Record<PropertyKey, any>>(
	arr: T[],
	key: string,
	propertiesToInclude?: Array<keyof T>
): Result<GroupedObject<T>[], Error> {
	if (!isArray(arr) || isEmpty(arr)) {
		return err(new Error('[collections.groupedByOne] Input must be an array and cannot be empty'));
	}

	if (!isString(key)) {
		return err(new Error('[collections.groupedByOne] Expected string value for the key parameter'));
	}

	if (isDefined(propertiesToInclude)) {
		if (!isArray(propertiesToInclude)) {
			return err(
				new Error('[collections.groupedByOne] Expected array for the key propertiesToInclude')
			);
		}
	}

	const collection = Array.from(arr);
	const groups = collection.reduce((grouped: Record<string, T[]>, item: any) => {
		const groupKey = key.split('.').reduce((obj, prop) => obj?.[prop], item);

		const stringKey = String(groupKey);
		if (!grouped[stringKey]) {
			grouped[stringKey] = [];
		}
		grouped[stringKey].push(item as T);

		return grouped;
	}, {});

	function mapToGroupedObject([group, items]: [string, T[]]): GroupedObject<T> {
		return {
			group,
			items: items.map((item) => getIncludedProps(item, propertiesToInclude))
		};
	}

	const grouped = Object.entries(groups).map(mapToGroupedObject);
	return ok(grouped);
}

/**
 * Groups an array of objects by a given property and returns an array of objects
 * with a `group` key and an array of grouped objects as its `items` value.
 *
 * @remarks
 * The resulting objects in the `items` array will only contain properties that are
 * listed in the `includedProps` array. If `destruct` is set to true, the original
 * objects in the `items` array will be destructed and only the filtered properties
 * will remain.
 *
 * @typeParam T - The type of the objects in the input array.
 * @param arr - The array of objects to group.
 * @param property - The property or properties to group the objects by. Use dot notation
 * to group by nested properties.
 * @param includedProps - An optional array of properties to include from the original objects
 * before grouping them.
 * @returns A `Result` object containing an array of objects representing the groups and their
 * items, or an error if the input is not valid.
 * @example
 * Example usage, grouping by country and age, destruct name property
 * ```typescript
 * const input = [
 *   { name: 'John', age: 30, country: 'USA' },
 *   { name: 'Alice', age: 25, country: 'Canada' },
 *   { name: 'Bob', age: 35, country: 'USA' },
 *   { name: 'Eve', age: 28, country: 'Canada' }
 * ];
 *
 * groupedByMany(input, 'country.age', ['name'], true)
 * // =>
 * // { ok: true, value:
 * //   [
 * //     { group: 'USA.30', items: [{ age: 30 }] },
 * //     { group: 'Canada.25', items: [{ age: 25 }] },
 * //     { group: 'USA.35', items: [{ age: 35 }] },
 * //     { group: 'Canada.28', items: [{ age: 28 }] }
 * //   ]
 * // }
 *```
 */
export function groupedByMany<T>(
	arr: T[],
	key: string,
	propertiesToInclude?: Array<keyof T>
): Result<GroupedObject<T>[], Error> {
	if (!isDefined(arr) || isEmpty(arr)) {
		return err(new Error('[collections.groupedByMany] Input must be an array and cannot be empty'));
	}

	if (!isString(key)) {
		return err(
			new Error('[collections.groupedByMany] Expected string value for the key parameter')
		);
	}

	if (isDefined(propertiesToInclude)) {
		if (!isArray(propertiesToInclude)) {
			return err(
				new Error('[collections.groupedByMany] Expected array for the key propertiesToInclude')
			);
		}
	}

	const collection = arr as T[];
	const groups: Record<string, T[]> = {};

	// If propValue is not an array, it will create an array with a single item
	// and push the obj into the corresponding group.
	collection.forEach((obj) => {
		const propValue = getPropertyValue(obj, key);
		const values = Array.isArray(propValue) ? propValue : [propValue];
		values.forEach((value) => {
			const groupKey = String(value);
			groups[groupKey] = groups[groupKey] || [];
			groups[groupKey].push(obj);
		});
	});

	function mapToGroupedObject([group, items]: [string, T[]]): GroupedObject<T> {
		return {
			group,
			items: items.map((item) => getIncludedProps(item, propertiesToInclude))
		};
	}

	const grouped = Object.entries(groups).map(mapToGroupedObject);

	return ok(grouped);
}

/**
 * Shuffles an input array and returns a copy of it.
 * Uses the modern Fisher-Yates shuffle algorithm to generate a random permutation
 * of the input array.
 *
 * @remarks The input array is not modified.
 *
 * @typeParam T - The type of the elements in the array.
 * @param arr - The array to shuffle.
 * @returns A Result object with either the shuffled array if `ok`, or an `Error` object if the
 * provided input is not an array
 *
 * @example
 * ```typescript
 * shuffle(['foo', 'bar', 'baz'])
 * // => { ok: true, value: shuffled copy of the array }
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * shuffle('not an array')
 * // => { ok: false, value: error: Error('[collections.shuffle] Input is not an array') }
 * ```
 */
export function shuffle<const T extends number | string | boolean>(arr: T[]): Result<T[], Error> {
	if (!isArray(arr)) {
		return err(new Error('[collections.shuffle] Input is not an array.'));
	}

	if (arr.some((value) => isNullish(value))) {
		return err(
			new Error('[collections.shuffle] Input array cannot contains null or undefined valyues.')
		);
	}

	for (let i = 0; i < arr.length; i++) {
		const randomIndex = Math.floor(Math.random() * arr.length);
		[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
	}

	return ok([...arr]);
}

/**
 * Shuffles an array of plain JavaScript objects by the specified property.
 *
 * @remarks
 * This function creates a shallow copy of the input array and sorts the resulting array by the specified property.
 *
 * @typeParam T - The type of objects in the input array.
 * @typeParam K - The type of the property used for sorting the input array.
 * @param arr - The array to shuffle.
 * @param key - The property to use for sorting the array.
 * @returns A `Result` object with either the shuffled array, or an `Error` object if the input is invalid.
 *
 * @example
 * Shuffle an array of objects by the "name" property
 * ```typescript
 * const people = [
 *   { name: 'Alice', age: 30 },
 *   { name: 'Bob', age: 25 },
 *   { name: 'Charlie', age: 35 }
 * ];
 *
 * shuffleByProperty(people, 'name');
 * // => { ok: true, value: [{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }, { name: 'Alice', age: 30 }] }
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * shuffleByProperty('not an array')
 * // => { ok: false, value: error: Error('[collections.shuffleByProperty] Input is not an array') }
 * ```
 */
export function shuffleByProperty<T, K extends keyof T>(arr: T[], key: K): Result<T[], Error> {
	if (!isArray(arr)) {
		return err(new Error('[collections.shuffleObjectsByProperty] Input is not an array.'));
	}

	if (arr.some((value) => isNullish(value) || isNullish(value[key]))) {
		return err(
			new Error('[collections.shuffleObjectsByProperty] All array elements must be defined.')
		);
	}

	const newArr = arr.map((obj) => obj);
	for (let i = 0; i < newArr.length; i++) {
		const randomIndex = Math.floor(Math.random() * newArr.length);
		[newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]];
	}

	return ok(newArr);
}

/**
 * Returns a random element or an array of random elements from an input array
 * without modifying the original array.
 * Only elements of type `number`, `string`, or `boolean` are considered valid.
 *
 * @typeParam T - The type of the elements in the input array.
 * @param arr - The input array from which to select random elements.
 * @param quantity - Optional. The number of random elements to return. Defaults to 1.
 * @returns A `Result` object with either the selected random element(s), or an `Error` object if
 * the provided input is not an array.
 *
 * @example
 * ```typescript
 * const input1 = [1, 2, 3, 4, 5];
 * const result1 = pickRandom(input1); // ok
 * const result2 = pickRandom(input1, 2); // ok
 *
 * const input3 = ["apple", "banana", "cherry", "date"];
 * const result3 = pickRandom(input3, 3); // ok
 *
 * const input4 = [true, false, undefined, null];
 * const result4 = pickRandom(input4, 1); // err
 *
 * const input5 = [1, 2, 3, 4, 5];
 * const result5 = pickRandom(input5, 3); // ok
 *
 * const input6 = ["a", "b", "c", "d", "e"];
 * const result6 = pickRandom(input6, 2); // ok
 * ```
 */
export function pickRandom<T extends number | string | boolean>(
	arr: T[],
	quantity = 1
): Result<T | T[], Error> {
	if (!isArray(arr)) {
		return err(new Error('[collections.pickRandom] Input is not an array.'));
	}

	if (!arr.every(isNumber) && !arr.every(isString) && !arr.every(isBool)) {
		return err(
			new Error(
				'[collections.pickRandomValues] Input array can contains numbers, strings and booleans only.'
			)
		);
	}

	if (!isNumber(quantity)) {
		return err(new Error('[collections.pickRandom] quantity param must be a number.'));
	}

	// Create a copy of the input array to avoid modifying the original array
	return shuffle(arr).map((shuffled) => {
		return quantity === 1 ? shuffled[0] : shuffled.slice(0, quantity);
	});
}

/**
 * Checks if an array contains a given value or an array of values.
 *
 * @typeParam T - The type of the elements in the input array.
 * @param arr - The array to check.
 * @param value - The value or array of values to check for.
 *
 * @returns A boolean value indicating whether the array contains the value(s).
 *
 * @example
 * ```typescript
 * contains(['apple', 'banana', 'cherry'], 'banana'))
 * // => true
 *
 * contains(['one', 'two', 'four'], ['two', 'one'])
 * // => true
 *
 * contains(['apple', 'banana', 'cherry'], 'orange'))
 * // => false
 *
 * contains([1, 2, 3], 4)
 * // => false
 *
 * contains([1, "hello", 3], 4)
 * // => false
 *
 * contains("not an array")
 * // => false
 * ```
 */
export function contains<T extends number | string | boolean>(
	arr: T[],
	value: T | T[]
): value is T | T[] {
	if (!isArray(arr)) return false;

	if (!arr.every(isNumber) && !arr.every(isString) && !arr.every(isBool)) return false;

	if (isArray(value)) {
		return value.every((v) => contains(arr, v));
	}

	const tmpRes = Array.from(arr).includes(value);
	return isNumber(value) || isBool(value) ? tmpRes : !isEmpty(value as T) && tmpRes;
}

/**
 * Removes duplicates from an array of numbers or strings.
 *
 * @typeParam T - The type of the elements in the input array.
 * @param arr - The array to remove duplicates from.
 * @returns A `Result` object with either an array with the duplicates removed, or an `Error`
 * object if the provided input is not an array.
 *
 * @example
 * ```typescript
 * const arr1 = [1, 2, 3, 2, 1]
 * uniq(arr1)
 * // => { ok: true, value: [1, 2, 3] }
 *
 * const arr2 = ['apple', 'banana', 'cherry', 'banana', 'apple']
 * uniq(arr2).value
 * // => { ok: true, value: ['apple', 'banana', 'cherry'] }
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * uniq('not an array')
 * // => { ok: false, value: error: Error('[collections.uniq] Input is not an array') }
 * ```
 */
export function uniq<T extends number | string>(arr: T[]): Result<T[], Error> {
	if (!isArray(arr)) {
		return err(new Error('[collections.uniq] Input must be an array.'));
	}

	const uniqSet = new Set<T>(arr);
	return ok(Array.from(uniqSet));
}

// --------------------------------------------------------------------------------------

/**
 * Returns a partial object containing only the specified properties from the input object.
 * If no properties are specified, returns a shallow copy of the input object.
 *
 * @typeParam T - The type of the input object.
 * @param item - The input object to extract properties from.
 * @param propertiesToInclude - An optional array of property names to include in the returned object.
 * @returns A partial object containing the specified properties of the input object.
 */
function getIncludedProps<T>(item: T, propertiesToInclude?: Array<PropertyKey>): Partial<T> {
	if (propertiesToInclude && propertiesToInclude.length > 0) {
		const includedProps: Partial<T> = {};
		propertiesToInclude.forEach((prop) => {
			includedProps[prop as keyof T] = item[prop as keyof T];
		});
		return includedProps;
	} else {
		return item;
	}
}
