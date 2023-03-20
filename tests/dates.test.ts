import { describe, it, expect } from 'vitest';
import { padTo2Digits, dayOfMonthFromDate, monthShortFromDate, formatDate } from '../src/dates';

describe('padTo2Digits', () => {
	it('should be 08 as string', () => {
		expect(padTo2Digits(8)).toBe('08');
	});

	it('should be 28 as string', () => {
		expect(padTo2Digits(28)).toBe('28');
	});
});

describe('dayOfMonthFromDate', () => {
	it('should be 12', () => {
		const date = '11/12/2023';
		expect(dayOfMonthFromDate(date)).toBe(12);
	});

	it('should be NaN', () => {
		const date = '20/12/2023';
		expect(dayOfMonthFromDate(date)).toBeNaN();
	});
});

describe('monthShortFromDate', () => {
	it('should be Nov', () => {
		const date = '11/12/2023';
		expect(monthShortFromDate(date)).toBe('Nov');
	});

	it('should be Mar', () => {
		const date = '03/12/2023';
		expect(monthShortFromDate(date)).toBe('Mar');
	});
});

describe('formatDate', () => {
	it('should be 07/03/2023', () => {
		const date = new Date('2023-03-07T03:24:00');
		expect(formatDate(date)).toBe('07/03/2023');
	});

	it('should be 01/01/2023', () => {
		const date = new Date(2023, 0, 1);
		expect(formatDate(date)).toBe('01/01/2023');
	});
});
