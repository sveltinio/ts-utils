import { describe, it, expect } from 'vitest';
import {
	padTo2Digits,
	dayOfMonth,
	monthShort,
	formatDate,
	formatDateISO
} from '../src/dates/index.js';
import { ok } from 'neverthrow';

describe('padTo2Digits', () => {
	it('should be 08 as string', () => {
		expect(padTo2Digits(8)).toEqual(ok('08'));
	});

	it('should be 28 as string', () => {
		expect(padTo2Digits(28)).toEqual(ok('28'));
	});

	it('should be an error with "[dates.padTo2Digits] Expected number value as input"', () => {
		const result = padTo2Digits('');

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[dates.padTo2Digits] Expected number value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[dates.padTo2Digits] Expected number value as input')
		);
	});
});

describe('dayOfMonth', () => {
	it('should be 12', () => {
		const date = '11/12/2023';
		expect(dayOfMonth(date)).toEqual(ok(12));
	});

	it('should be NaN', () => {
		const date = '20/12/2023';
		expect(dayOfMonth(date)).toEqual(ok(NaN));
	});

	it('should be an error with "[dates.dayOfMonth] Expected string value as input"', () => {
		const result = dayOfMonth(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[dates.dayOfMonth] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[dates.dayOfMonth] Expected string value as input')
		);
	});
});

describe('monthShort', () => {
	it('should be Nov', () => {
		const date = '11/12/2023';
		expect(monthShort(date)).toEqual(ok('Nov'));
	});

	it('should be Mar', () => {
		const date = '03/12/2023';
		expect(monthShort(date)).toEqual(ok('Mar'));
	});

	it('should be an error with "[dates.monthShort] Expected string value as input"', () => {
		const result = monthShort(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[dates.monthShort] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[dates.monthShort] Expected string value as input')
		);
	});
});

describe('formatDate', () => {
	it('should be 07/03/2023', () => {
		const date = new Date('2023-03-07T03:24:00');
		expect(formatDate(date)).toEqual(ok('07/03/2023'));
	});

	it('should be 01/01/2023', () => {
		const date = new Date(2023, 0, 1);
		expect(formatDate(date)).toEqual(ok('01/01/2023'));
	});

	it('should be an error with "[dates.formatDate] Expected date value as input"', () => {
		const result = formatDate(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[dates.formatDate] Expected date value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[dates.formatDate] Expected date value as input')
		);
	});
});

describe('formatDateISO', () => {
	it('should be 2023-04-17', () => {
		const date = new Date('2023-04-17T03:24:00');
		expect(formatDateISO(date)).toEqual(ok('2023-04-17'));
	});

	it('should be 2023-04-17', () => {
		const date = new Date(2023, 3, 17);
		expect(formatDateISO(date)).toEqual(ok('2023-04-17'));
	});

	it('should be an error with "[dates.formatDateISO] Expected date value as input"', () => {
		const result = formatDateISO(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[dates.formatDateISO] Expected date value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[dates.formatDateISO] Expected date value as input')
		);
	});
});
