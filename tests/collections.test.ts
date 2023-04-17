import { describe, it, expect, expectTypeOf } from 'vitest';
import { orderBy, groupedByOne, groupedByMany, pickRandom, contains } from '../src/collections';
import { menu, people, posts } from './data.js';

describe('orderBy', () => {
	it('should be empty', () => {
		const res = orderBy([], 'weight');
		expect(res).toStrictEqual([]);
		expect(res.length).toBe(0);
	});

	it('should be sorted in ascending order', () => {
		const res = orderBy(menu, 'weight');
		expect(res).toStrictEqual(menu);
		expect(res[0].identifier).toBe('home');
		expect(res[3].identifier).toBe('contact');
	});

	it('should be sorted in descending order', () => {
		const res = orderBy(menu, 'weight', 'desc');
		expect(res[2].identifier).toBe('blog');
		expect(res[3].identifier).toBe('home');
	});

	it('should be sorted in alphabetical and ascending order', () => {
		const res = orderBy(menu, 'identifier');
		expect(res[0].url).toBe('/about');
		expect(res[3].url).toBe('/');
	});

	it('should be sorted in alphabetical and descending order', () => {
		const res = orderBy(menu, 'identifier', 'desc');
		expect(res[0].url).toBe('/');
		expect(res[2].url).toBe('/blog');
	});

	it('should throw an error', () => {
		expect(() => orderBy(menu, 'weigh')).toThrow('weigh is not a property of the object');
	});
});

describe('groupedByOne', () => {
	it('should be empty', () => {
		const res = groupedByOne('meta.category', []);
		expect(res).toStrictEqual([]);
		expect(res.length).toBe(0);
	});

	it('should be grouped by genre', () => {
		const res = groupedByOne('genre', people);

		const men = res.filter((r) => r.name === 'm');
		expect(men[0].items.length).toBe(3);
		expect(men[0].items[0].username).toBe('nick');
		expect(men[0].items[2].username).toBe('john');

		const women = res.filter((r) => r.name === 'f');
		expect(women[0].items.length).toBe(2);
		expect(women[0].items[0].username).toBe('sara');
	});

	it('should be grouped in 2 categories. Result should have only title as prop', () => {
		const res = groupedByOne('meta.category', posts, ['title']);

		expect(res.length).toBe(2);
		expect(Object.keys(res[0].items[0]).length).toBe(1);
		expect(Object.keys(res[0].items[0]).pop()).toBe('title');
	});

	it('should be grouped by 2 category names and result should all 4 props', () => {
		const res = groupedByOne('meta.category', posts);

		expect(res.length).toBe(2);
		expect(Object.keys(res[0].items[0]).length).toBe(4);
		expect(Object.keys(res[0].items[0])).toStrictEqual(['title', 'author', 'published-at', 'meta']);
	});

	it('should be grouped in 2 categories. nick is the username for the 1st item', () => {
		const res = groupedByOne('meta.category', posts);

		expect(res[0].name).toBe('webdev');
		expect(res[0].items[0].author).toBe('nick');
		expect(res[0].items[1].title).toBe('The future of Golang');
	});
});

describe('groupedByOne - no destruct', () => {
	it('should be grouped by category. Results should have the same structure of the original object but with title, author and meta.tags props only', () => {
		const res = groupedByOne('meta.category', posts, ['title', 'author', 'meta.tags'], false);

		res.map((r) => {
			r.items.map((i) => {
				expect(Object.keys(i).length).toBe(3);
			});
		});
	});
});

describe('groupedByMany', () => {
	it('should be empty', () => {
		const res = groupedByMany('meta.tags', []);
		expect(res.length).toBe(0);
	});

	it('should be grouped in 4 groups', () => {
		const res = groupedByMany('meta.tags', posts);
		expect(res.length).toBe(4);
	});

	it('should be grouped in 4 groups. Result should have only title as prop', () => {
		const res = groupedByMany('meta.tags', posts, ['title']);
		expect(res.length).toBe(4);

		const items = res[0].items as unknown as Array<string>;
		expect(Object.keys(Array.from(items)[0]).length).toBe(1);
	});

	it('should have tag_1 as first group name', () => {
		const res = groupedByMany('meta.tags', posts);
		expect(res[0].name).toBe('tag_1');
	});
});

describe('pickRandom', () => {
	it('should work for strings array', () => {
		const data = ['apple', 'banana', 'orange'];
		expectTypeOf(pickRandom(data)).toEqualTypeOf('pear');
	});

	it('should work for number array', () => {
		const data = [10, 20, 25];
		expectTypeOf(pickRandom(data)).toEqualTypeOf(12);
	});

	it('should work for booleans array', () => {
		const data = [true, true, false, true];
		expectTypeOf(pickRandom(data)).toEqualTypeOf(false);
	});

	it('should not be equal to string', () => {
		const data = [true, true, false, true];
		expectTypeOf(pickRandom(data)).not.toEqualTypeOf(10);
	});
});

describe('contains', () => {
	it('should be true', () => {
		expect(contains([1, 2, 3], 3)).toBe(true);
		expect(contains(['one', 'two', 'four'], 'two')).toBe(true);
	});

	it('should be false', () => {
		expect(contains([1, 2, 3], 4)).toBe(false);
		expect(contains(['one', 'two', 'four'], 'five')).toBe(false);
	});
});
