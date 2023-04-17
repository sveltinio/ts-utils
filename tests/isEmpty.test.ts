import { describe, expect, test } from 'vitest';
import { isEmpty } from '../src/index.js';

describe('isEmpty', () => {
	test('null and undefined', () => {
		expect(isEmpty(null)).toBe(true);
		expect(isEmpty(undefined)).toBe(true);
	});

	test('booleans', () => {
		expect(isEmpty(true)).toBe(true);
		expect(isEmpty(false)).toBe(false);
	});

	test('numbers', () => {
		expect(isEmpty(0)).toBe(false);
		expect(isEmpty(124)).toBe(false);
	});

	test('strings', () => {
		expect(isEmpty('')).toBe(true);
		expect(isEmpty('message')).toBe(false);
	});

	test('arrays', () => {
		expect(isEmpty([])).toBe(true);
		expect(isEmpty(['apple', 'banana'])).toBe(false);
		expect(isEmpty([1, 2, 3])).toBe(false);
	});

	test('objects', () => {
		expect(isEmpty({})).toBe(true);
		expect(isEmpty({ message: 'hello' })).toBe(false);
	});

	test('functions and symbols', () => {
		expect(isEmpty(function () {})).toBe(true);
		expect(isEmpty(Symbol())).toBe(true);
		expect(isEmpty(Symbol('x'))).toBe(false);
		expect(isEmpty(/./)).toBe(true);
	});
});
