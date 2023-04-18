/* eslint-disable no-useless-escape */

import { ok, err, Ok, Err } from 'neverthrow';

/**
 * Remove all trailing slashes from a string.
 *
 * @param str - string - The string to remove the trailing slash from.
 *
 * @returns The given string with all trailing slashes removed.
 *
 * @example
 * ```
 * // Prints "http://example.com/contact":
 * removeTrailingSlash("https://example.com/contact/");
 * ```
 */
export function removeTrailingSlash(str: string): string {
	return str.replace(/\/+$/, '');
}

/**
 * Capitalize the first letter of a string and lowercase the rest.
 *
 * @param str - string - The string to capitalize.
 *
 * @returns The first letter of the string is capitalized and the rest of the string is lowercased.
 *
 * @example
 * ```
 * // Prints "Example":
 * capitalize("example");
 * ```
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

/**
 * uppercase.
 *
 * @param str - string - The string to uppercase.
 *
 * @returns The uppercased string.
 *
 * @example
 * ```
 * // Prints "EXAMPLE":
 * uppercase("example");
 * ```
 */
export function uppercase(str: string): string {
	return str.toUpperCase();
}

/**
 * lowercase.
 *
 * @param str - string - The string to lowecase.
 *
 * @returns The lowercased string.
 *
 * @example
 * ```
 * // Prints "example":
 * uppercase("Example");
 * ```
 */
export function lowercase(str: string): string {
	return str.toLocaleLowerCase();
}

/**
 * It takes a string, splits it into an array of words, capitalizes the first letter of each word,
 * and then joins the array back into a string.
 *
 * @param str - string - The string to be capitalized.
 *
 * @returns The given string with capitalizes first letter of each word.
 *
 * @example
 * ```
 * // Prints "Bread And Butter":
 * capitalizeAll("bread and butter");
 * ```
 */
export function capitalizeAll(str: string): string {
	const splitted = str.toLowerCase().split(' ');
	const capitalized: Array<string> = [];

	splitted.forEach(function (item) {
		capitalized.push(capitalize(item));
	});
	return capitalized.join(' ');
}

/**
 * The function takes a string and returns it with the first letter of each word capitalized, with
 * an option to capitalize all first letters.
 *
 * @param {string} str - a string that you want to convert to title case
 * @param [capitalizeAllFirstLetters=true] - A boolean parameter that determines whether all the
 * first letters of each word in the string should be capitalized or not.
 *
 * @returns The given string as title text.
 *
 * @example
 * ```
 * // Prints "Getting Started":
 * toTitle("getting-started");
 * ```
 */
export function toTitle(str: string, capitalizeAllFirstLetters = true): string {
	if (capitalizeAllFirstLetters) {
		return capitalizeAll(str.replace(/-/g, ' ')).trim();
	}
	return capitalize(str.replace(/-/g, ' ')).trim();
}

/**
 * It takes a string, converts it to lowercase, removes all non-word characters, and replaces all
 * spaces with dashes.
 *
 * @param str - string - The string to convert to a slug.
 *
 * @returns The given string as valid slug.
 *
 * @example
 * ```
 * // Prints "getting-started":
 * toSlug("Getting Started");
 * ```
 */
export function toSlug(str: string): string {
	return str
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-')
		.trim();
}

/**
 * The function converts a given string to snake case format.
 *
 * @param {string} str - The input string that needs to be converted to snake case.
 *
 * @returns a string in snake_case format. If the input string contains any uppercase letters, they
 * are converted to lowercase and separated by underscores. If the input string does not contain any
 * uppercase letters, it is returned as is.
 */
export function toSnakeCase(str: string): string {
	const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
	const res = str.match(regex);

	if (res) {
		return res.map((x) => x.toLowerCase()).join('_');
	}
	return str;
}

/**
 * The function converts a given string to kebab case format.
 *
 * @param {string} str - The input string that needs to be converted to kebab case.
 *
 * @returns a string in kebab case format. If the input string contains uppercase letters, they are
 * converted to lowercase and separated by hyphens. If the input string does not contain any
 * uppercaseletters, it is returned as is.
 */
export function toKebabCase(str: string): string {
	const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
	const res = str.match(regex);

	if (res) {
		return res.map((x) => x.toLowerCase()).join('-');
	}
	return str;
}

/**
 * The function checks if a given string is a valid hexadecimal color code.
 *
 * @param {string} str - The input string that is being checked to see if it is a valid hexadecimal
 * color code.
 *
 * @returns A boolean value is being returned, which indicates whether the input string is a valid
 * hexadecimal color code or not.
 */
export function isHex(str: string): boolean {
	return /^#([0-9A-F]{3}){1,2}$/i.test(str);
}

/**
 * The function takes a string and returns either the substring after the first character (if the
 * string is a valid hex value) or an error message.
 *
 * @param {string} str - A string that may or may not be a valid hex string.
 *
 * @returns either an `Err` or an `Ok` type. If the input string is a valid hex string, the function
 * returns an `Ok` type with the hex value as a string. If the input string is not a valid hex
 * string, the function returns an `Err` type with an `Error` object containing the message
 * "Expected a valid hex string".
 */
export function getHexValue(str: string): Err<never, Error> | Ok<string, never> {
	if (isHex(str)) return ok(str.substring(1));
	return err(new Error('Expected a valid hex string'));
}

/**
 * The function checks if a given string contains a comma-separated list.
 *
 * @param {string} str - a string that needs to be checked if it is comma-separated or not.
 *
 * @returns A boolean value indicating whether the input string contains a comma or not.
 */
export function isCommaSepareted(str: string): boolean {
	return str.indexOf(',') >= 0;
}

/**
 * The function takes a string and replaces all whitespace and semicolons with commas to return a
 * comma-separated string.
 *
 * @param {string} str - The `str` parameter is a string that represents a sentence or a list of
 * items separated by spaces or semicolons. The function `toCommaSeparated` replaces all spaces and
 * semicolons with commas and returns the modified string.
 *
 * @returns A string that replaces all occurrences of whitespace and semicolons in the input string
 * with commas.
 */
export function toCommaSepareted(str: string): string {
	const re = /\s+|;+/g;
	return str.replace(re, ',');
}

/**
 * It takes a string, a char as start delimiter and one as end delimiter, and return the substring enclosed between startsWith and endsWith chars.
 *
 * @param text - string - The input string.
 * @param startsWith - string - The char at the beginning of the string.
 * @param endsWith - string - The char at the end of the string.
 *
 * @returns The trimmed string between startesWith and endsWith chars.
 *
 *  @example
 * ```
 * // Prints "blog/posts/welcome":
 * textBetween("/blog/posts/welcome/", "/", "/");
 * ```
 */
export function textBetween(text: string, startsWith: string, endsWith: string) {
	/*const regex = new RegExp(`${_escape(startsWith)}(.*)${_escape(endsWith)}+$`);
	const result = text.match(regex);
*/
	const result = text.match(`(?<=${_escape(startsWith)})(.*)(?=${_escape(endsWith)})`);
	return result ? result[1].trim() : text;
}

/**
 * The function removes the first occurrence of a specified string from a given text.
 *
 * @param {string} text - The original string from which the first occurrence of the search string
 * will be removed.
 * @param {string} searchstr - The searchstr parameter is a string that represents the substring
 * that needs to be removed from the text parameter. The function removes the first occurrence of
 * this substring from the text parameter.
 *
 * @returns The function `removeFirstOccurrence` returns a modified version of the `text` string
 * where the first occurrence of the `searchstr` string has been removed. If the `searchstr` string
 * is not found in the `text` string, the original `text` string is returned.
 */
export function removeFirstOccurrence(text: string, searchstr: string) {
	const index = text.indexOf(searchstr);
	if (index === -1) {
		return text;
	}
	return text.slice(0, index) + text.slice(index + searchstr.length);
}

// --------------------------------------------------------------------------------------

// Escape special characters [ \ ^ $ . | ? * + ( )
function _escape(value: string): string {
	switch (value) {
		case '[':
			return '\\[';
		case ']':
			return '\\]';
		case '/':
			return '\\/';
		case '^':
			return '\\^';
		case '$':
			return '\\$';
		case '.':
			return '\\.';
		case '|':
			return '\\|';
		case '?':
			return '\\?';
		case '*':
			return '\\*';
		case '+':
			return '\\+';
		case '(':
			return '\\(';
		case ')':
			return '\\)';
		default:
			return value;
	}
}
