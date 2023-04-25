import { describe, expect, test } from 'vitest';
import {
	isBool,
	isNumber,
	isBigInt,
	isString,
	isArray,
	isObject,
	isSymbol,
	isTruthy,
	isDate,
	isRegExp,
	isDefined,
	isEmpty
} from '../src/is/index.js';

describe('isBool', () => {
	test('various types', () => {
		expect(isBool(true)).toBe(true);
		expect(isBool(false)).toBe(true);

		expect(isBool('hello')).toBe(false);
		expect(isBool(10)).toBe(false);
	});
});

describe('isNumber', () => {
	test('various types', () => {
		expect(isNumber(10)).toBe(true);
		expect(isNumber(-10)).toBe(true);

		expect(isNumber('hello')).toBe(false);
		expect(isNumber(true)).toBe(false);
	});
});

describe('isBigInt', () => {
	test('various types', () => {
		expect(isBigInt(10n)).toBe(true);
		expect(isBigInt(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true);
		expect(isBigInt(BigInt(22))).toBe(true);

		expect(isBigInt(10)).toBe(false);
		expect(isBigInt('hello')).toBe(false);
		expect(isBigInt(true)).toBe(false);
	});
});

describe('isString', () => {
	test('various types', () => {
		expect(isString('hello')).toBe(true);

		expect(isString(true)).toBe(false);
		expect(isString(10)).toBe(false);
	});
});

describe('isArray', () => {
	test('various types', () => {
		expect(isArray([1, 2, 3])).toBe(true);
		expect(isArray([])).toBe(true);

		expect(isArray(true)).toBe(false);
		expect(isArray(10)).toBe(false);
	});
});

describe('isObject', () => {
	test('various types', () => {
		expect(isObject({})).toBe(true);
		expect(isObject({ message: 'hello' })).toBe(true);
		expect(isObject([1, 2, 3])).toBe(true);
		expect(isObject(() => {})).toBe(true);

		expect(isObject(true)).toBe(false);
		expect(isObject(10)).toBe(false);
	});
});

describe('isSymbol', () => {
	test('various types', () => {
		expect(isSymbol(Symbol('hello'))).toBe(true);
		expect(isSymbol(Symbol(10))).toBe(true);

		expect(isSymbol(10)).toBe(false);
		expect(isSymbol('')).toBe(false);
		expect(isSymbol(true)).toBe(false);
		expect(isSymbol(null)).toBe(false);
		expect(isSymbol(undefined)).toBe(false);
	});
});

describe('isTruthy', () => {
	test('various types', () => {
		expect(isTruthy(true)).toBe(true);
		expect(isTruthy('hello')).toBe(true);
		expect(isTruthy(10)).toBe(true);
		expect(isTruthy(10n)).toBe(true);
		expect(isTruthy([])).toBe(true);
		expect(isTruthy({})).toBe(true);

		expect(isTruthy(null)).toBe(false);
		expect(isTruthy(undefined)).toBe(false);
		expect(isTruthy(false)).toBe(false);
		expect(isTruthy(0n)).toBe(false);
		expect(isTruthy(NaN)).toBe(false);
	});
});

describe('isDate', () => {
	test('various types', () => {
		expect(isDate(new Date('2023-03-16'))).toBe(true);
		expect(isDate(new Date())).toBe(true);

		expect(isDate(true)).toBe(false);
		expect(isDate(false)).toBe(false);
		expect(isDate('hello')).toBe(false);
		expect(isDate(10)).toBe(false);
	});
});

describe('isRegExp', () => {
	test('various types', () => {
		expect(isRegExp(/ab+c/)).toBe(true);
		expect(isRegExp(new RegExp('ab+c', 'i'))).toBe(true);

		expect(isRegExp(true)).toBe(false);
		expect(isRegExp('hello')).toBe(false);
		expect(isRegExp(10)).toBe(false);
	});
});

describe('isDefined', () => {
	test('various types', () => {
		expect(isDefined(null)).toBe(false);
		expect(isDefined(undefined)).toBe(false);
		expect(isDefined(NaN)).toBe(false);

		expect(isDefined(true)).toBe(true);
		expect(isDefined(false)).toBe(true);

		expect(isDefined(0)).toBe(true);
		expect(isDefined(1)).toBe(true);
		expect(isDefined(124)).toBe(true);

		expect(isDefined('')).toBe(true);
		expect(isDefined('message')).toBe(true);

		expect(isDefined([])).toBe(true);
		expect(isDefined(['apple', 'banana'])).toBe(true);
		expect(isDefined([1, 2, 3])).toBe(true);

		expect(isDefined({})).toBe(true);
		expect(isDefined({ message: 'hello' })).toBe(true);

		expect(isDefined(Symbol())).toBe(true);
		expect(isDefined(Symbol('x'))).toBe(true);
		expect(isDefined(/./)).toBe(true);
		expect(isDefined(function () {})).toBe(true);
	});
});

describe('isEmpty', () => {
	test('various types', () => {
		expect(isEmpty(null)).toBe(true);
		expect(isEmpty(undefined)).toBe(true);
		expect(isEmpty(NaN)).toBe(true);

		expect(isEmpty(true)).toBe(true);
		expect(isEmpty(false)).toBe(true);

		expect(isEmpty(0)).toBe(true);
		expect(isEmpty(1)).toBe(true);
		expect(isEmpty(124)).toBe(true);

		expect(isEmpty('')).toBe(true);
		expect(isEmpty('message')).toBe(false);

		expect(isEmpty([])).toBe(true);
		expect(isEmpty(['apple', 'banana'])).toBe(false);
		expect(isEmpty([1, 2, 3])).toBe(false);

		expect(isEmpty({})).toBe(true);
		expect(isEmpty({ message: 'hello' })).toBe(false);

		expect(isEmpty(Symbol())).toBe(true);
		expect(isEmpty(Symbol('x'))).toBe(true);
		expect(isEmpty(/./)).toBe(true);
		expect(isEmpty(function () {})).toBe(true);
	});
});
