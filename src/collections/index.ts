import { isEmpty } from '../index.js';

export type sortOrder = 'asc' | 'desc';

/**
 * It takes a collection, an iteratee, and an order, and returns a sorted collection by the iteratee.
 *
 * @param collection - The array to sort.
 * @param iteratee - string- The property to sort by.
 * @param order - string `[order=asc]` - The order in which you want to sort the array.
 * It can be either 'asc' or 'desc'.
 *
 * @returns an array of objects sorted by the iteratee property.
 */
export function orderBy<T extends Record<PropertyKey, any>>(
	collection: T[],
	iteratee: string,
	order: sortOrder = 'asc'
): T[] {
	if (collection == null || isEmpty(collection)) return [];

	const sort = (iteratee: string, arr: T[]) => {
		const propsArray = iteratee.split('.');

		if (typeof propsArray === 'undefined') return [];

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

	return sort(iteratee, collection);
}

/**
 * It takes a collection of objects, groups them by a property, and returns an array of objects with
 * the grouped items.
 *
 * @param property - string - The property to group by. It can be a dot notation path.
 * @param collection - The array of objects to be grouped.
 * @param filteredProps - string[] = [] - The object properties you want back. Default, all.
 * @param destruct - boolean - `true` - if true, the function will return a new object with only the
 * properties specified in the filteredProps array.
 *
 * @returns An array of objects with the following structure:
 * \{
 * 	name: string,
 * 	items: any[]
 * \}
 */
export function groupedByOne<T extends Record<PropertyKey, any>>(
	property: string,
	collection: T[],
	filteredProps: string[] = [],
	destruct = true
): Record<PropertyKey, any>[] {
	if (collection == null || isEmpty(collection)) return [];

	const grouped: T[] = [];
	const obj: any = {};
	const propsArray = property.split('.');

	Array.from(collection).forEach((elem) => {
		const props = propsArray.reduce(function (acc, prop) {
			return acc && acc[prop];
		}, elem as any);

		if (typeof props === 'undefined') return [];

		if (!(props in obj)) {
			obj[props] = { name: props, items: [] };
			grouped.push(obj[props]);
		}

		const result = makeResultObj(elem, filteredProps, destruct);

		obj[props].items.push(result);
	});

	return grouped;
}

/**
 * It takes a collection of objects, a property name, and an array of properties to filter out, and
 * returns a new array of objects with the property name as the key and the filtered properties as
 * the value.
 *
 * @param property - The property to group by. It can be a dot notation path.
 * @param collection - The array of objects to be grouped.
 * @param filteredProps - string[] = []. The object properties you want back. Default, all.
 * @param destruct - boolean - `true` - if true, the function will return a new object with only the
 * properties specified in the filteredProps array.
 *
 * @returns An array of objects with the following structure:
 * \{
 * 	name: string,
 * 	items: any[]
 * \}
 */
export function groupedByMany<T extends Record<PropertyKey, any>>(
	property: string,
	collection: T[],
	filteredProps: string[] = [],
	destruct = true
): Record<PropertyKey, any>[] {
	if (collection == null || isEmpty(collection)) return [];

	const propsArray = property.split('.');

	const res = Array.from(collection).reduce((acc, curr) => {
		const props = propsArray.reduce(function (propsAccumulator, currProp) {
			return propsAccumulator && propsAccumulator[currProp];
		}, curr as any);

		if (typeof props === 'undefined') return [];

		Array.from(props).forEach((prop: any) => {
			let result: Record<string, any> = {};
			if (typeof prop !== 'undefined' && !(prop in curr)) {
				result = makeResultObj(curr, filteredProps, destruct);
			}

			if (acc[prop]) {
				acc[prop].push(result);
			} else {
				acc[prop] = [result];
			}
		});
		return acc;
	}, {} as Record<PropertyKey, any>[]);

	const grouped = Object.entries(res);
	return grouped.map(([name, items]) => ({ name, items }));
}

// --------------------------------------------------------------------------------------

/**
 * It takes an object and an array of strings, and returns a new object with only the properties
 * specified in the array.
 *
 * @param originalObj - The original object that you want to filter.
 * @param filteredProps - string[] = []. The object properties you want back. Default, all.
 * @param destruct - boolean - If true, the function will return a destructed object otherwise the original object structure will be preserved.
 *
 * @returns A function that takes in an object, an array of strings, and a boolean.
 */
function makeResultObj(
	originalObj: Record<string, any>,
	filteredProps: string[],
	destruct: boolean
): Record<PropertyKey, any> {
	let result: Record<PropertyKey, any> = {};

	switch (isEmpty(filteredProps)) {
		case false:
			result = destruct
				? destructObj(originalObj, filteredProps)
				: asIsObjStructure(originalObj, filteredProps);
			break;
		default:
			result = originalObj;
			break;
	}

	return result;
}

/**
 * It takes an array of strings and an object, and returns a new object
 * with the properties specified in the array.
 *
 * @param originalObj - The object to destruct.
 * @param props - An array of strings representing the properties to destruct.
 *
 * @returns An object with the properties that are passed in as props.
 */
function destructObj(
	originalObj: Record<PropertyKey, any>,
	props: string[]
): Record<PropertyKey, any> {
	return props.reduce((obj, prop) => {
		const selectors = prop.split('.');
		const propName = selectors[selectors.length - 1];

		obj[propName] = getPropValue(originalObj, prop).pop();
		return obj;
	}, {} as Record<string, any>);
}

/**
 * It takes an array of strings and an object, and returns a new object with only the properties
 * specified in the array.
 *
 * @param originalObj - The original object you want to get the properties from.
 * @param props - An array of strings that represent the properties to get
 * from the original object.
 *
 * @returns An object with the properties that are passed in as props.
 */
function asIsObjStructure(
	originalObj: Record<PropertyKey, any>,
	props: string[]
): Record<PropertyKey, any> {
	return props.reduce((resultObj: Record<PropertyKey, any>, currentProp: string) => {
		if (!currentProp.includes('.')) {
			resultObj[currentProp] = originalObj[currentProp];
			return resultObj;
		}

		const keys = currentProp.split('.');
		const lastKey = keys.pop();

		const lastObj = keys.reduce((acc: Record<PropertyKey, any>, key: string) => {
			// Create an object at this key if it doesn't exist yet
			if (!acc[key]) {
				acc[key] = {};
			}
			return acc[key];
		}, resultObj);

		if (lastKey != undefined) {
			lastObj[lastKey] = getPropValue(originalObj, currentProp);
		}
		return resultObj;
	}, {} as Record<PropertyKey, any>);
}

/**
 * It takes an object and a list of selectors, and returns an array of the values of the object
 * that correspond to the selectors
 *
 * - Credits to: https://www.30secondsofcode.org/js/s/get
 *
 * @param from - The object to get the property from.
 * @param selectors - An array of strings that are the selectors to get the property from.
 *
 * @returns An array of values from the object.
 */
function getPropValue(from: Record<PropertyKey, any>, ...selectors: string[]) {
	return [...selectors].map((s) =>
		s
			.replace(/\[([^[\]]*)\]/g, '.$1.')
			.split('.')
			.filter((t) => t !== '')
			.reduce((prev, cur) => prev && prev[cur], from)
	);
}
