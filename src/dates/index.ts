/**
 * Given a number, return a string that is the number padded to two digits.
 * Used if the month and day values only contain a single digit (are less than 10).
 *
 * @param num - number - The number to pad.
 *
 * @returns A string with the number padded to two digits.
 *
 * @example
 * ```
 * // Prints 08:
 * padTo2Digits(8);
 * ```
 */
export function padTo2Digits(num: number): string {
	return num.toString().padStart(2, '0');
}

/**
 * It takes a date object and returns a string in the format DD/MM/YYYY
 *
 * @param date - Date - The date to format.
 *
 * @returns A string in the format DD/MM/YYYY.
 *
 * @example
 * ```
 * // Prints "07/03/2023":
 * formatDate(new Date('2023-03-07T03:24:00'));
 * ```
 */
export function formatDate(date: Date): string {
	return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join(
		'/'
	);
}

/**
 * The function formats a given date object into an ISO string format.
 *
 * @param {Date} date - The input parameter of type Date that represents the date to be formatted.
 *
 * @returns A string representing the date in ISO format (YYYY-MM-DD).
 *
 *  @example
 * ```
 * // Prints "2023-04-17":
 * formatDate(new Date(2023, 3, 17));
 * ```
 */
export function formatDateISO(date: Date): string {
	return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
		'-'
	);
}

/**
 * Given a date string in the format MM/DD/YYYY, return the day of the month.
 *
 * @param dateStr - string - The date string in the format MM/DD/YYYY to be parsed.
 *
 * @returns The day of the month from the date string.
 *
 * @example
 * ```
 * // Prints 3:
 * dayOfMonthFromDate("07/03/2023");
 * ```
 */
export function dayOfMonthFromDate(dateStr: string): number {
	const dt = new Date(dateStr);
	return dt.getDate();
}

/**
 * Given a date string in the format MM/DD/YYYY, return the short month name.
 *
 * @param dateStr - string - The date string in the format MM/DD/YYYY to convert to a month short.
 *
 * @returns A string representing the month of the date passed in.
 *
 * @example
 * ```
 * // Prints Jul:
 * monthShortFromDate("07/03/2023");
 * ```
 */
export function monthShortFromDate(dateStr: string): string {
	const dt = new Date(dateStr);
	return dt.toLocaleString('default', { month: 'short' });
}
