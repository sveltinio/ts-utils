import { describe, it, expect } from 'vitest';
import {
	hasProperty,
	hasProperties,
	hasPropertyValue,
	hasPropertiesWithValue,
	mapToCssVars,
	getPropertyValue,
	merge
} from '../src/objects/index.js';
import { ok, err } from 'neverthrow';

describe('hasProperty', () => {
	it('returns ok(true) if object has the given property', () => {
		const obj = { a: 1, b: 'hello' };
		const key = 'a';

		const result = hasProperty(obj, key);

		expect(result).toEqual(ok(true));
	});

	it('returns ok(false) if object does not have the given property', () => {
		const obj = { a: 1, b: 'hello' };
		const key = 'c';

		const result = hasProperty(obj, key);

		expect(result).toEqual(ok(false));
	});

	it('returns err if the first argument is not a plain object', () => {
		const obj = 'not an object';
		const key = 'a';

		const result = hasProperty(obj, key);

		expect(result).toEqual(
			err(new Error('[objects.hasProperty] Expected a plain javascript object'))
		);
	});

	it('returns err if the second argument is not a valid property key', () => {
		const obj = { a: 1, b: 'hello' };
		const key = 123;

		const result = hasProperty(obj, key);

		expect(result).toEqual(err(new Error('[objects.hasProperty] Expected a valid property key')));
	});
});

describe('hasProperties', () => {
	it('returns ok(true) if object has all the given properties', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const keys = ['a', 'b'];

		const result = hasProperties(obj, keys);

		expect(result).toEqual(ok(true));
	});

	it('returns ok(false) if object does not have all the given properties', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const keys = ['a', 'd'];

		const result = hasProperties(obj, keys);

		expect(result).toEqual(ok(false));
	});

	it('returns err if the first argument is not a plain object', () => {
		const obj = 'not an object';
		const keys = ['a', 'b'];

		const result = hasProperties(obj, keys);

		expect(result).toEqual(
			err(new Error('[objects.hasProperties] Expected a plain javascript object'))
		);
	});

	it('returns err if the second argument is not an array of valid property keys', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const keys = 'not an array';

		const result = hasProperties(obj, keys);

		expect(result).toEqual(
			err(new Error('[objects.hasProperties] Expected an array of object properties'))
		);
	});
});

describe('hasPropertyValue', () => {
	it('returns ok(true) if object has the given property with the given value', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const key = 'a';
		const value = 1;

		const result = hasPropertyValue(obj, key, value);

		expect(result).toEqual(ok(true));
	});

	it('returns ok(false) if object has the given property but with a different value', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const key = 'a';
		const value = 2;

		const result = hasPropertyValue(obj, key, value);

		expect(result).toEqual(ok(false));
	});

	it('returns err if object has the given property but with a different type of value', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const key = 'b';
		const value = 2;

		const result = hasPropertyValue(obj, key, value);

		expect(result).toEqual(ok(false));
	});

	it('returns err if object does not have the given property', () => {
		const obj = { a: 1, b: 'hello', c: true };
		const key = 'd';
		const value = 2;

		const result = hasPropertyValue(obj, key, value);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[objects.hasPropertyValue] Property d does not exist'
		);
	});
});

describe('hasPropertiesWithValue', () => {
	it('should return true when all properties match', () => {
		const obj = {
			name: 'John Doe',
			age: 42,
			email: 'johndoe@example.com'
		};
		const result = hasPropertiesWithValue(obj, {
			name: 'John Doe',
			age: 42,
			email: 'johndoe@example.com'
		});
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(true);
	});

	it('should return false when at least one property does not match', () => {
		const obj = {
			name: 'John Doe',
			age: 42,
			email: 'johndoe@example.com'
		};
		const result = hasPropertiesWithValue(obj, {
			name: 'John',
			age: 42,
			email: 'johndoe@example.com'
		});
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(false);
	});

	it('should still return true when at least one property is missing', () => {
		const obj = {
			name: 'John Doe',
			age: 42,
			email: 'johndoe@example.com'
		};
		const result = hasPropertiesWithValue(obj, { name: 'John Doe', age: 42 });
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(true);
	});

	it('should still return error if the property does not exist in the object', () => {
		const obj = {
			name: 'John Doe',
			age: 42,
			email: 'johndoe@example.com'
		};
		const result = hasPropertiesWithValue(obj, { surname: 'John', age: 42 });
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[objects.hasPropertyValue] Property surname does not exist'
		);
	});
});

describe('deepMerge', () => {
	it('merges two objects with overlapping properties', () => {
		const target = { a: { b: 1, c: 2 }, d: 3 };
		const source = { a: { b: 2, d: 4 }, e: 5 };
		const expected = { a: { b: 2, c: 2, d: 4 }, d: 3, e: 5 };
		const result = merge(target, source);
		expect(result).toEqual(expected);
	});

	it('merges arrays at the same level', () => {
		const target = { a: [1, 2] };
		const source = { a: [3, 4] };
		const expected = { a: [1, 2, 3, 4] };
		const result = merge(target, source);
		expect(result).toEqual(expected);
	});

	it('merges nested arrays', () => {
		const target = { a: [1, [2, 3]] };
		const source = { a: [[4, 5], 6] };
		const expected = { a: [1, [2, 3], [4, 5], 6] };
		const result = merge(target, source);
		expect(result).toEqual(expected);
	});

	it('merges objects with null values', () => {
		const target = { a: null };
		const source = { a: { b: 1 } };
		const expected = { a: { b: 1 } };
		const result = merge(target, source);
		expect(result).toEqual(expected);
	});

	it('returns the source object if the target is undefined', () => {
		const target = undefined;
		const source = { a: 1 };
		const expected = { a: 1 };
		const result = merge(target, source);
		expect(result).toEqual(expected);
	});
});

describe('getPropertyValue', () => {
	it('should return undefined for non-existent properties', () => {
		const obj = { a: { b: { c: 'value' } } };
		expect(getPropertyValue(obj, 'd')).toBe(undefined);
		expect(getPropertyValue(obj, 'a.e')).toBe(undefined);
		expect(getPropertyValue(obj, 'a.b.f')).toBe(undefined);
	});

	it('should return the value of existing properties', () => {
		const obj = { a: { b: { c: 'value' } } };
		expect(getPropertyValue(obj, 'a.b.c')).toBe('value');
		expect(getPropertyValue(obj, 'a')).toEqual({ b: { c: 'value' } });
		expect(getPropertyValue(obj, 'a.b')).toEqual({ c: 'value' });
	});

	it('should handle nested properties with numeric keys', () => {
		const obj = { a: { b: [{ c: 'value' }] } };
		expect(getPropertyValue(obj, 'a.b.0.c')).toBe('value');
	});

	it('should handle non-object values', () => {
		expect(getPropertyValue(null, 'a')).toBe(undefined);
		expect(getPropertyValue(undefined, 'a')).toBe(undefined);
		expect(getPropertyValue('string', 'a')).toBe(undefined);
		expect(getPropertyValue(123, 'a')).toBe(undefined);
	});
});

describe('mapToCssVars', () => {
	it('returns a string with CSS variables for a plain object', () => {
		const obj = {
			color: 'red',
			backgroundColor: 'white',
			fontSize: '16px'
		};
		const expected = '--color: red; --backgroundColor: white; --fontSize: 16px;';
		const result = mapToCssVars(obj);
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(expected);
	});

	it('returns a string with CSS variables for a plain object adding a prefix string', () => {
		const obj = {
			color: 'red',
			backgroundColor: 'white',
			fontSize: '16px'
		};
		const expected = '--pfx-color: red; --pfx-backgroundColor: white; --pfx-fontSize: 16px;';
		const result = mapToCssVars(obj, 'pfx');
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(expected);
	});

	it('returns an error for a non-plain object', () => {
		const obj = [1, 2, 3];
		const result = mapToCssVars(obj);
		expect(result.isOk()).toBe(false);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[objects.mapToCssVarsString] Expected a plain javascript object'
		);
	});
});
