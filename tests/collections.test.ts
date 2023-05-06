import { describe, it, expect } from 'vitest';
import {
	sortBy,
	groupedByOne,
	groupedByMany,
	pickRandom,
	shuffle,
	contains,
	uniq,
	shuffleByProperty
} from '../src/collections/index.js';
import { menu, people, posts } from './sample_data.js';

describe('sortBy', () => {
	it('should be sorted in ascending order', () => {
		const res = sortBy(menu, 'weight');

		expect(res._unsafeUnwrap()).toStrictEqual(menu);
		expect(res._unsafeUnwrap()[0].identifier).toBe('home');
		expect(res._unsafeUnwrap()[3].identifier).toBe('contact');
	});

	it('should be sorted in descending order', () => {
		const res = sortBy(menu, 'weight', 'desc');

		expect(res._unsafeUnwrap()[2].identifier).toBe('blog');
		expect(res._unsafeUnwrap()[3].identifier).toBe('home');
	});

	it('should be sorted in alphabetical and ascending order', () => {
		const res = sortBy(menu, 'identifier', 'asc');

		expect(res._unsafeUnwrap()[0].url).toBe('/about');
		expect(res._unsafeUnwrap()[3].url).toBe('/');
	});

	it('should be sorted in alphabetical and descending order', () => {
		const res = sortBy(menu, 'identifier', 'desc');

		expect(res._unsafeUnwrap()[0].url).toBe('/');
		expect(res._unsafeUnwrap()[2].url).toBe('/blog');
	});

	it('should be empty', () => {
		const res = sortBy([], 'weight');

		expect(res._unsafeUnwrapErr().message).toBe(
			'[collections.sortBy] Input must be an array and cannot be empty'
		);
	});

	it('should throw an error', () => {
		expect(() => sortBy(menu, 'weigh')).toThrow('weigh is not a property of the object');
	});

	it('should throw an error if iteratee parameter is not a string', () => {
		expect(sortBy(menu, 10)._unsafeUnwrapErr().message).toBe(
			'[collections.sortBy] Expected string value for the iteratee parameter'
		);
	});
});

describe('groupedByOne', () => {
	it('should be grouped by genre', () => {
		const res = groupedByOne(people, 'genre');

		const men = res._unsafeUnwrap().filter((r) => r.group === 'm');
		expect(men[0].items.length).toBe(3);
		expect(men[0].items[0].username).toBe('nick');
		expect(men[0].items[2].username).toBe('john');

		const women = res._unsafeUnwrap().filter((r) => r.group === 'f');
		expect(women[0].items.length).toBe(2);
		expect(women[0].items[0].username).toBe('sara');
	});

	it('should be grouped in 2 categories. Result should have only title as prop', () => {
		const res = groupedByOne(posts, 'meta.category', ['title']);

		expect(res._unsafeUnwrap().length).toBe(2);
		expect(Object.keys(res._unsafeUnwrap()[0].items[0]).length).toBe(1);
		expect(Object.keys(res._unsafeUnwrap()[0].items[0]).pop()).toBe('title');
	});

	it('should be grouped by 2 category names and result should all 4 props', () => {
		const res = groupedByOne(posts, 'meta.category');

		expect(res._unsafeUnwrap().length).toBe(2);
		expect(Object.keys(res._unsafeUnwrap()[0].items[0]).length).toBe(4);
		expect(Object.keys(res._unsafeUnwrap()[0].items[0])).toStrictEqual([
			'title',
			'author',
			'published-at',
			'meta'
		]);
	});

	it('should be grouped in 2 categories. nick is the username for the 1st item', () => {
		const res = groupedByOne(posts, 'meta.category');

		expect(res._unsafeUnwrap()[0].group).toBe('webdev');
		expect(res._unsafeUnwrap()[0].items[0].author).toBe('nick');
		expect(res._unsafeUnwrap()[0].items[1].title).toBe('The future of Golang');
	});

	it('should be no destruct', () => {
		const res = groupedByOne(posts, 'meta.category', ['title', 'author', 'meta.tags'], false);

		res._unsafeUnwrap().map((r) => {
			r.items.map((i) => {
				expect(Object.keys(i).length).toBe(3);
			});
		});
	});

	it('should be an error with [collections.groupedByOne] Input must be an array and cannot be empty" as message', () => {
		const res = groupedByOne([], 'meta.category');

		expect(res._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByOne] Input must be an array and cannot be empty'
		);
	});

	it('should be an error with [collections.groupedByOne] Expected string value for the key parameter" as message', () => {
		const res = groupedByOne(posts, 0n);

		expect(res._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByOne] Expected string value for the key parameter'
		);
	});

	it('should be an error with [collections.groupedByOne] Expected array for the key propertiesToInclude" as message', () => {
		const res = groupedByOne(posts, 'meta.category', 0n);

		expect(res._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByOne] Expected array for the key propertiesToInclude'
		);
	});
});

describe('groupedByMany', () => {
	it('handles an empty input array', () => {
		const result = groupedByMany([], 'city');
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByMany] Input must be an array and cannot be empty'
		);
	});

	it('handles a non-array input', () => {
		const result = groupedByMany(null as unknown as any[], 'city');
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByMany] Input must be an array and cannot be empty'
		);
	});

	it('should be grouped in 4 groups', () => {
		const res = groupedByMany(posts, 'meta.tags');
		expect(res._unsafeUnwrap().length).toBe(4);
	});

	it('should be grouped in 4 groups. Result should have only title as prop', () => {
		const res = groupedByMany(posts, 'meta.tags', ['title']);
		expect(res._unsafeUnwrap().length).toBe(4);

		const items = res._unsafeUnwrap()[0].items as unknown as Array<string>;
		expect(Object.keys(Array.from(items)[0]).length).toBe(1);
	});

	it('should have tag_1 as first group name', () => {
		const res = groupedByMany(posts, 'meta.tags');
		expect(res._unsafeUnwrap()[0].group).toBe('tag_1');
	});

	it('should be an error with [collections.groupedByMany] Expected string value for the key parameter" as message', () => {
		const res = groupedByMany(posts, 0n);

		expect(res._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByMany] Expected string value for the key parameter'
		);
	});

	it('should be an error with [collections.groupedByMany] Expected array for the key propertiesToInclude" as message', () => {
		const res = groupedByMany(posts, 'meta.category', 0n);

		expect(res._unsafeUnwrapErr().message).toBe(
			'[collections.groupedByMany] Expected array for the key propertiesToInclude'
		);
	});
});

describe('shuffle', () => {
	it('should work for strings array', () => {
		const data = ['apple', 'banana', 'orange'];
		const result = shuffle(data);
		expect(Array.isArray(result._unsafeUnwrap())).toBe(true);
	});

	it('should work for number array', () => {
		const data = [10, 20, 25];
		const result = shuffle(data);
		expect(Array.isArray(result._unsafeUnwrap())).toBe(true);
	});

	it('should work for an array with mixed types passing false as second param', () => {
		const data = [10, 'orange', 20, 'apple', 25];
		const result = shuffle(data, false);
		expect(Array.isArray(result._unsafeUnwrap())).toBe(true);
	});

	it('should be an error with "[collections.shuffle] Input array cannot contains null or undefined valyues." as message', () => {
		const data = [10, 'orange', null, 'apple', 25, undefined];
		const result = shuffle(data);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[collections.shuffle] Input array cannot contains null or undefined valyues.'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[collections.shuffle] Input array cannot contains null or undefined valyues.')
		);
	});

	it('should be an error with "[collections.shuffle] Input is not an array.." as message', () => {
		const data = null;
		const result = shuffle(data);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe('[collections.shuffle] Input is not an array.');
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[collections.shuffle] Input is not an array.')
		);
	});
});

describe('shuffleByProperty', () => {
	it('shuffles an array of objects by the specified property', () => {
		const people = [
			{ name: 'Alice', age: 30 },
			{ name: 'Bob', age: 25 },
			{ name: 'Charlie', age: 35 },
			{ name: 'John', age: 32 },
			{ name: 'Sam', age: 40 },
			{ name: 'Robert', age: 39 }
		];
		const result = shuffleByProperty(people, 'name');
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).not.toEqual(people);
		expect(result._unsafeUnwrap().sort((a, b) => a.name.localeCompare(b.name))).toEqual(
			people.sort((a, b) => a.name.localeCompare(b.name))
		);
	});

	it('returns an error for invalid input', () => {
		const result = shuffleByProperty(null as any, 'name');
		expect(result._unsafeUnwrapErr()).toBeInstanceOf(Error);
	});

	it('returns an error for input with undefined elements', () => {
		const people = [
			{ name: 'Alice', age: 30 },
			{ name: 'Bob', age: undefined },
			{ name: 'Charlie', age: 35 }
		];
		const result = shuffleByProperty(people, 'age');
		expect(result.isOk()).toBe(false);
		expect(result._unsafeUnwrapErr()).toBeInstanceOf(Error);
	});
});

describe('pickRandom', () => {
	it('should work for strings array', () => {
		const data = ['apple', 'banana', 'orange'];
		const result = pickRandom(data);
		expect(result.isOk()).toEqual(true);
		expect(typeof result._unsafeUnwrap() === 'string').toBe(true);
	});

	it('should work for number array', () => {
		const data = [10, 20, 25];
		const result = pickRandom(data);
		expect(typeof result._unsafeUnwrap() === 'number').toBe(true);
	});

	it('should be an array of strings with 2 elements', () => {
		const data = ['apple', 'banana', 'orange'];
		const result = pickRandom(data, 2);
		expect(Array.isArray(result._unsafeUnwrap())).toBe(true);
	});

	it('should be an error with "[collections.pickRandom] quantity param must be a number." as message', () => {
		const data = ['apple', 'banana', 'orange'];
		const result = pickRandom(data, 'hi');
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[collections.pickRandom] quantity param must be a number.'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[collections.pickRandom] quantity param must be a number.')
		);
	});

	it('should be an error with "[collections.pickRandomValues] Input array can contains numbers, strings and booleans only." as message', () => {
		const data = [Symbol('orange'), Symbol('red'), Symbol('green')];
		const result = pickRandom(data);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[collections.pickRandomValues] Input array can contains numbers, strings and booleans only.'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error(
				'[collections.pickRandomValues] Input array can contains numbers, strings and booleans only.'
			)
		);
	});

	it('should be an error with "[collections.pickRandom] Input is not an array." as message', () => {
		const data = null;
		const result = pickRandom(data);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[collections.pickRandom] Input is not an array.'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[collections.pickRandom] Input is not an array.')
		);
	});
});

describe('contains', () => {
	it('should be true', () => {
		expect(contains([1, 2, 3], 3)).toBe(true);
		expect(contains(['one', 'two', 'four'], 'two')).toBe(true);
		expect(contains([1, 2, 3], [3])).toBe(true);
		expect(contains(['one', 'two', 'four'], ['two', 'one'])).toBe(true);
		expect(contains([true, true, false, true], false)).toBe(true);
	});

	it('should be false', () => {
		expect(contains([1, 2, 3], 4)).toBe(false);
		expect(contains(['one', 'two', 'four'], 'five')).toBe(false);
		expect(contains([1, 2, 3], [4])).toBe(false);
		expect(contains(['one', 'two', 'four'], ['five'])).toBe(false);
	});

	it('should returns false passing an array of mixed types', () => {
		expect(contains([1, 'hello', 3], 4)).toBe(false);
	});

	it('should returns false passing an array of not supported types', () => {
		expect(contains('not-an-array', 4)).toBe(false);
		expect(contains({ message: 'hello' }, true)).toBe(false);
	});
});

describe('uniq', () => {
	it('should be an array of 3 elements', () => {
		const arr1 = [1, 2, 3, 2, 1];
		expect(uniq(arr1)._unsafeUnwrap().length).toBe(3);
		expect(uniq(arr1)._unsafeUnwrap()).toStrictEqual([1, 2, 3]);
		expect(uniq(arr1)._unsafeUnwrap()[1]).toBe(2);
	});

	it('should be', () => {
		const arr = ['apple', 'banana', 'cherry', 'banana', 'apple'];
		expect(uniq(arr)._unsafeUnwrap()).toStrictEqual(['apple', 'banana', 'cherry']);
	});

	it('should work for an array with mixed types passing false as second param', () => {
		const arr = ['apple', 'banana', 1, 2, 'cherry', 'banana', 3, 2, 'apple'];
		expect(uniq(arr, false)._unsafeUnwrap()).toStrictEqual(['apple', 'banana', 1, 2, 'cherry', 3]);
	});

	it('should be an error with "[collections.uniq] Input must be an array." as message', () => {
		const data = null;
		const result = uniq(data);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe('[collections.uniq] Input must be an array.');
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[collections.uniq] Input must be an array.')
		);
	});
});
