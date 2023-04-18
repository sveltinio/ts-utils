import { describe, it, expect } from 'vitest';
import { isPlainObject, checkPropValue, checkRequiredProp, objToCssVars } from '../src/objects';
import { Ok, Err } from 'neverthrow';

describe('isPlainObject', () => {
	it('should be true for null value', () => {
		expect(isPlainObject({})).toBe(true);
		expect(isPlainObject({ a: 1 })).toBe(true);
		expect(isPlainObject(new Object())).toBe(true);
		expect(isPlainObject(undefined)).toBe(false);
		expect(isPlainObject(null)).toBe(false);
		expect(isPlainObject(1)).toBe(false);
		expect(isPlainObject('a')).toBe(false);
		expect(isPlainObject(false)).toBe(false);
		expect(isPlainObject([])).toBe(false);
		expect(isPlainObject(new Array())).toBe(false);
		expect(isPlainObject(() => {})).toBe(false);
		expect(isPlainObject(function () {})).toBe(false);
		expect(isPlainObject(Symbol())).toBe(false);
	});
});

describe('checkPropValue', () => {
	it('should be true', () => {
		const obj = { label: 'welcome', href: 'https://example.com' };
		const result = checkPropValue(obj, 'label', 'welcome') as Ok<boolean, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(true);
	});

	it('should be false', () => {
		const obj = { label: 'welcome', href: 'https://example.org' };
		const result = checkPropValue(obj, 'label', 'welcom') as Ok<boolean, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(false);
	});

	it('should be an error with "Expected a plain javascript object" as message', () => {
		const obj = [1, 2, 3];
		const result = checkPropValue(obj, 'label', 'welcom') as Err<never, Error>;
		expect(result.isOk()).toBe(false);
		expect(result.isErr()).toBe(true);
		expect(result.error.message).toBe('Expected a plain javascript object');
		expect(result.error).toStrictEqual(new Error('Expected a plain javascript object'));
	});
});

describe('checkRequiredProp', () => {
	it('should be true', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { label: 'welcome', href: 'https://example.com' };
		const result = checkRequiredProp(obj, mandatoryKeys) as Ok<boolean, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(true);
	});

	it('should be false, missing label key', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { href: 'https://example.com' };
		const result = checkRequiredProp(obj, mandatoryKeys) as Ok<boolean, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(false);
	});

	it('should be false, label value is empty string', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { label: '', href: 'https://example.com' };
		const result = checkRequiredProp(obj, mandatoryKeys) as Ok<boolean, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(false);
	});

	it('should be false, href value contains undefined', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { label: 'welcome', href: 'undefined' };
		const result = checkRequiredProp(obj, mandatoryKeys) as Ok<boolean, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(false);
	});

	it('should be an error with "Expected a plain javascript object" as message', () => {
		const obj = [1, 2, 3];
		const mandatoryKeys = ['label', 'href'];
		const result = checkRequiredProp(obj, mandatoryKeys) as Err<never, Error>;
		expect(result.isOk()).toBe(false);
		expect(result.isErr()).toBe(true);
		expect(result.error.message).toBe('Expected a plain javascript object');
		expect(result.error).toStrictEqual(new Error('Expected a plain javascript object'));
	});
});

describe('objToCssVars', () => {
	it('should return a valid string with CSS variables', () => {
		const styles = {
			pt: '1rem',
			'btn-border': '1px'
		};

		const want = '--pt: 1rem; --btn-border: 1px;';
		const result = objToCssVars(styles) as Ok<string, never>;
		expect(result.isOk()).toBe(true);
		expect(result.isErr()).toBe(false);
		expect(result.value).toBe(want);
	});

	it('should be an error with "Expected a plain javascript object" as message', () => {
		const styles = [1, 2, 3];
		const result = objToCssVars(styles) as Err<never, Error>;
		expect(result.isOk()).toBe(false);
		expect(result.isErr()).toBe(true);
		expect(result.error.message).toBe('Expected a plain javascript object');
		expect(result.error).toStrictEqual(new Error('Expected a plain javascript object'));
	});
});
