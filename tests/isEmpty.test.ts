import { describe, it, expect } from 'vitest';
import { isEmpty } from '../src/index.js';

describe('isEmpty', () => {
	it('should be true for empty string', () => {
		expect(isEmpty('')).toBe(true);
	});

	it('should be false for not empty string', () => {
		expect(isEmpty('message')).toBe(false);
	});

	it('should be true for empty array', () => {
		expect(isEmpty([])).toBe(true);
	});

	it('should be false for not empty array', () => {
		expect(isEmpty(['apple', 'banana'])).toBe(false);
	});

	it('should be true for empty object', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('should be false for not empty object', () => {
		expect(isEmpty({ message: 'hello' })).toBe(false);
	});
});
