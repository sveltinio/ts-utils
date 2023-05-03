/**
 * A bunch of utilities to deal with dates.
 *
 * @packageDocumentation
 */

import { Ok, Result, err, ok } from 'neverthrow';
import { isNumber, isString, isDate } from '../is';

/**
 * Pads a number to exactly 2 digits with leading zeros.
 * Used if the month and day values only contain a single digit (are less than 10).
 *
 * @param num - The number to pad.
 * @returns A `Result` object with either the padded number as a string on success, or an `Error`
 * object if the provided input is not a number.
 *
 *
 *  @example
 * ```typescript
 * padTo2Digits(7)
 * // => { ok: true, value: '07' }
 * ```
 *
 * @example
 * Handle invalid input:
 * ```typescript
 * padTo2Digits("hello")
 * // => { ok: false, error: Error('[dates.padTo2Digits] Expected number value as input') }
 * ```
 */
export function padTo2Digits(num: number): Result<string, Error> {
	if (!isNumber(num)) {
		return err(new Error('[dates.padTo2Digits] Expected number value as input'));
	}

	return ok(num.toString().padStart(2, '0'));
}

/**
 * Formats a Date object into a string representation of the date in the format "dd/mm/yyyy".
 *
 * @param date - The date to format.
 * @returns A `Result` object with either a string containing the formatted date
 * in the format "dd/mm/yyyy" on success, or an `Error` object if the input value is not
 * a valid `Date` object.
 *
 *  @example
 * ```typescript
 * formatDate(new Date('2023-03-07T03:24:00'))
 * // => { ok: true, value: '07/03/2023' }
 * ```
 *
 * @example
 * Handle invalid input:
 * ```typescript
 * formatDate(10)
 * // => { ok: false, error: Error('[dates.formatDate] Expected string value as input') }
 * ```
 */
export function formatDate(date: Date): Result<string, Error> {
	if (!isDate(date)) {
		return err(new Error('[dates.formatDate] Expected date value as input'));
	}

	const day = padTo2Digits(date.getDate()) as Ok<string, never>;
	const month = padTo2Digits(date.getMonth() + 1) as Ok<string, never>;
	const year = date.getFullYear();

	return ok([day.value, month.value, year].join('/'));
}

/**
 * Formats a Date object into a string representation of the date in the ISO 8601 format "yyyy-mm-dd".
 *
 * @param date - The Date object to format.
 * @returns  A `Result` object with a string containing the formatted date
 * in the ISO 8601 format "yyyy-mm-dd" on success, or an Error object if the provided
 * input is not a valid Date object.
 *
 *  @example
 * ```typescript
 * formatDateISO(new Date())
 * // => { ok: true, value: '2023-04-25' }
 * ```
 *
 * @example
 * Handle invalid input:
 * ```typescript
 * formatDateISO(10)
 * // => { ok: false, error: Error('[dates.formatDateISO] Expected string value as input') }
 * ```
 */
export function formatDateISO(date: Date): Result<string, Error> {
	if (!isDate(date)) {
		return err(new Error('[dates.formatDateISO] Expected date value as input'));
	}

	const year = date.getFullYear();
	const month = padTo2Digits(date.getMonth() + 1) as Ok<string, never>;
	const day = padTo2Digits(date.getDate()) as Ok<string, never>;

	return ok([year, month.value, day.value].join('-'));
}

/**
 * Extracts the day of the month as a number from a given date string.
 *
 * @param dateStr - The date string to extract the day of the month from.
 * @returns A `Result` object with either the day of the month as a number on success,
 * or an `Error` object if the input value is not a valid date string.
 *
 *  @example
 * ```typescript
 * dayOfMonth("07/03/2023")
 * // => { ok: true, value: '3' }
 * ```
 *
 * @example
 * Handle invalid input:
 * ```typescript
 * dayOfMonth(10)
 * // => { ok: false, error: Error('[dates.dayOfMonth] Expected string value as input') }
 * ```
 */
export function dayOfMonth(dateStr: string): Result<number, Error> {
	if (!isString(dateStr)) {
		return err(new Error('[dates.dayOfMonth] Expected string value as input'));
	}

	const dt = new Date(dateStr);
	return ok(dt.getDate());
}

/**
 * Extracts the short name of the month from a given date string.
 *
 * @param dateStr - The date string to extract the short name of the month from.
 * @returns A `Result` object with either the short name of the month on success,
 * or an `Error` object if the input value is not a valid date string.
 *
 *  @example
 * ```typescript
 * monthShort("07/03/2023")
 * // => { ok: true, value: 'Jul' }
 * ```
 *
 * @example
 * Handle invalid input:
 * ```typescript
 * monthShort(10)
 * // => { ok: false, error: Error('[dates.monthShort] Expected string value as input') }
 * ```
 */
export function monthShort(dateStr: string): Result<string, Error> {
	if (!isString(dateStr)) {
		return err(new Error('[dates.monthShort] Expected string value as input'));
	}

	const dt = new Date(dateStr);
	return ok(dt.toLocaleString('default', { month: 'short' }));
}
