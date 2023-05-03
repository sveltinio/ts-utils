/**
 * A bunch of utilities to deal with color strings.
 *
 * @packageDocumentation
 */

import { Result, err, ok } from 'neverthrow';

/**
 *  Checks if a string represents a valid hexadecimal color code.
 *
 * @param str - The string to check for hexadecimal color code.
 * @returns A `Result` object with either a boolean indicating if the input string is a valid
 * hexadecimal color code, or an `Error` object if the provided input is not a string.
 *
 * @example
 * ```typescript
 * isHex("#ff00ff")
 * // => true
 *
 * isHex("ff0000")
 * // => false
 * ```
 */
export function isHex(str: string): boolean {
	return /^#([0-9A-F]{3}){1,2}$/i.test(str);
}

/**
 * Extracts the hexadecimal value from a string that starts with a "#" character.
 *
 * @param str - The string to extract the hexadecimal value from.
 * @returns A `Result` object with either the hexadecimal value as string on success, or an `Error`
 * object if the provided input is not a string.
 *
 * @example
 * ```typescript
 * getHexValue("#ff00ff")
 * // => { ok: true, value: 'ff00ff' }
 * ```
 *
 * @example
 * Handle invalid input:
 * ```typescript
 * getHexValue("ff0000")
 * // => { ok: false, error: Error('[colors.getHexValue] Expected a valid hex string') }
 * ```
 */
export function getHexValue(str: string): Result<string, Error> {
	if (isHex(str)) {
		return ok(str.substring(1));
	}

	return err(new Error('[colors.getHexValue] Expected valid hex string as input'));
}

/**
 * Generates a random hexadecimal color code.
 *
 * @returns A randomly generated hexadecimal color code, e.g. "#FF0000".
 *
 * @example
 * ```
 * randomHexColor()
 * // => "#AA55BC"
 * ```
 */
export function randomHexColor(): string {
	const charset = '0123456789ABCDEF';

	let color = '#';
	Array.from({ length: 6 }, () => {
		const randomIdx = Math.floor(Math.random() * charset.length);
		color = color.concat(charset[randomIdx]);
	});

	return color;
}
