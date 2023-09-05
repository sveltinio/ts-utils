/* eslint-disable no-useless-escape */

/**
 * A bunch of utilities to deal with strings.
 *
 * @packageDocumentation
 */

import { ok, err, Result } from 'neverthrow';
import { isString } from '../is';

/**
 * Normalizes a string by replacing non-word characters with a space character.
 *
 * @param str -The string normalize.
 * @returns A `Result` object with either the normalized string on success, or an `Error` object if
 * the provided input is not a string.
 *
 * @example
 * ```typescript
 * normalize('Hello_World!123')
 * // => { ok: true, value: 'Hello World 123' }
 * // => Hello World 123
 *
 * normalize('This is a sample string.')
 * // => { ok: true, value: 'This is a sample string' }
 * ```
 *
 * @example
 * Returns the default if there is an error:
 * ```typescript
 * normalize(10).unwrapOr('')
 * // => ''
 *```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * normalize(42)
 * // => { ok: false, error: Error('[strings.normalize] Expected string value as input') }
 * ```
 */
export function normalize(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.normalize] Expected string value as input'));
	}
	return ok(str.replace(/\W+|_+/g, ' '));
}

/**
 * Removes trailing slashes from a given string.
 *
 * @param str - The string to remove trailing slashes from.
 * @returns  A `Result` object with either the modified string on success, or an `Error` object if
 * the provided input is not a string.
 *
 * @example
 * Here is a simple example:
 * ```typescript
 * removeTrailingSlash("https://example.com/")
 * // => { ok: true, value: 'http://example.com' }
 *
 * removeTrailingSlash("https://example.com/path/")
 * // => { ok: true, value: 'https://example.com/path' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * removeTrailingSlash(42)
 * // => { ok: false, error: Error('[strings.removeTrailingSlash] Expected string value as input') }
 * ```
 */
export function removeTrailingSlash(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.removeTrailingSlash] Expected string value as input'));
	}
	return ok(str.replace(/\/+$/g, ''));
}

/**
 * Converts a string to uppercase.
 *
 * @param str - The string to convert to uppercase.
 * @returns A `Result` object with either the converted string on success, or an `Error` object if
 * the provided input is not a string.
 *
 * @example
 * ```typescript
 * uppercase("hello world")
 * // => { ok: true, value: 'HELLO WORLD' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * uppercase(42)
 * // => { ok: false, error: Error('[strings.uppercase] Expected string value as input') }
 * ```
 */
export function uppercase(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.uppercase] Expected string value as input'));
	}
	return ok(str.toUpperCase());
}

/**
 * Converts a string to uppercase.
 *
 * @param str - The string to convert to uppercase.
 * @returns A `Result` object with either the converted string on success, or an `Error` object if
 * the provided input is not a string.
 *
 * @example
 * ```typescript
 * lowercase("Hello World")
 * // => { ok: true, value: 'hello world' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * lowercase(42)
 * // => { ok: false, error: Error('[strings.lowercase] Expected string value as input') }
 * ```
 */
export function lowercase(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.lowercase] Expected string value as input'));
	}
	return ok(str.toLocaleLowerCase());
}

/**
 * Capitalizes the first letter of a given string and converts the rest of the string to lowercase.
 *
 * @param str - The string to capitalize.
 * @returns A `Result` object with either the capitalized string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * ```typescript
 * capitalize("hello world")
 * // => { ok: true, value: 'Hello World' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * capitalize(42)
 * // => { ok: false, error: Error('[strings.capitalize] Expected string value as input') }
 * ```
 */
export function capitalize(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.capitalize] Expected string value as input'));
	}

	return normalize(str).andThen((cleaned) =>
		ok(cleaned.charAt(0).toUpperCase().concat(cleaned.substring(1).toLowerCase()))
	);
}

/**
 * Capitalizes the first letter of each word in a given string and converts the rest of the string to lowercase.
 *
 * @param str  - The string to capitalize.
 * @returns A `Result` object with either the capitalized string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * ```typescript
 * capitalizeAll("bread and butter")
 * // => { ok: true, value: 'Bread And Butter' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * capitalizeAll(42)
 * // => { ok: false, error: Error('[strings.capitalizeAll] Expected string value as input') }
 * ```
 */
export function capitalizeAll(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.capitalizeAll] Expected string value as input'));
	}

	const re = /[^a-zA-Z0-9]+(.)/g;
	const replacerFunc = (_: any, chr: string) => ' ' + chr.toUpperCase();

	return normalize(str).andThen((cleaned) =>
		lowercase(' ' + cleaned).map((s) => s.replace(re, replacerFunc).trim())
	);
}

/**
 * Converts a string to title case by capitalizing the first letter of each word.
 * Optionally, all first letters of each word can be capitalized.
 * It wraps {@link capitalize} and {@link capitalizeAll}.
 * @see {@link capitalize}
 * @see {@link capitalizeAll}
 *
 * @param str - The string to convert to title case.
 * @param capitalizeAllFirstLetters - Whether to capitalize all first letters of each word. Default is `true`.
 * @defaultValue `capitalizeAllFirstLetters = true`
 * @returns A `Result` object with either the title cased string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * ```typescript
 * toTitle("bread and butter")
 * // => { ok: true, value: 'Bread And Butter' }
 *
 * toTitle("bread and butter", false)
 * // => { ok: true, value: 'Bread and butter' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * toTitle(42)
 * // => { ok: false, error: Error('[strings.toTitle] Expected string value as input') }
 * ```
 */
export function toTitle(str: string, capitalizeAllFirstLetters = true): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toTitle] Expected string value as input'));
	}

	if (capitalizeAllFirstLetters) {
		return capitalizeAll(str);
	}

	return capitalize(str);
}

/**
 * Converts a string to a slug format, replacing spaces with hyphens and removing special characters.
 *
 * @param str - The string to convert to a slug format.
 * @returns A `Result` object with either the slug string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * ```typescript
 * toSlug("Bread And Butter")
 * // => { ok: true, value: 'bread-and-butter' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * toSlug(42)
 * // => { ok: false, error: Error('[strings.toSlug] Expected string value as input') }
 * ```
 */
export function toSlug(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toSlug] Expected string value as input'));
	}

	return normalize(str).andThen((s) =>
		lowercase(s).map((_s) =>
			_s
				.replace(/[^\w ]+/g, '')
				.replace(/ +/g, '-')
				.trim()
		)
	);
}

/**
 * Converts a string to snake_case.
 *
 * @remarks
 * This function converts a string to kebab-case, which is a naming convention where multiple words
 * are joined together with underscores (_) and all characters are lowercase.
 *
 * @param str - The input string to convert.
 * @returns A `Result` containing the converted string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Converting a string with spaces to snake_case:
 * ```typescript
 * toSnakeCase('hello world')
 * // => { ok: true, value: 'hello_world' }
 *```
 *
 * @example
 * Converting a string with hyphens to snake_case:
 * ```typescript
 * toSnakeCase('fooBarBaz')
 * // => { ok: true, value: 'foo_bar_baz' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * toSnakeCase(42)
 * // => { ok: false, error: Error('[strings.toSnakeCase] Expected string value as input') }
 * ```
 */
export function toSnakeCase(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toSnakeCase] Expected string value as input'));
	}

	const re = /[^a-zA-Z0-9]+(.)/g;
	const replacerFunc = (_: any, chr: string) => '_' + chr;

	return normalize(str).andThen((s) =>
		lowercase(s).map((_s) => _s.replace(re, replacerFunc).trim())
	);
}

/**
 * Converts a string to kebab-case.
 *
 * @remarks
 * This function converts a string to kebab-case, which is a naming convention where multiple words
 * are joined together with hyphens, and all letters are lowercase.
 *
 * @param str - The input string to convert.
 * @returns A `Result` containing the converted string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Converting a string with spaces to camelCase:
 * ```typescript
 * toKebabCase('hello world')
 * // => { ok: true, value: 'hello-world' }
 *```
 *
 * @example
 * Converting a string with hyphens to camelCase:
 * ```typescript
 * toKebabCase('fooBarBaz')
 * // => { ok: true, value: 'foo-bar-baz' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * toKebabCase(42)
 * // => { ok: false, error: Error('[strings.toKebabCase] Expected string value as input') }
 * ```
 */
export function toKebabCase(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toKebabCase] Expected string value as input'));
	}

	const re = /[^a-zA-Z0-9]+(.)/g;
	const replacerFunc = (_: any, chr: string) => '-' + chr;

	return normalize(str).andThen((s) =>
		lowercase(s).map((_s) => _s.replace(re, replacerFunc).trim())
	);
}

/**
 * Converts a string to camelCase.
 *
 * @remarks
 * This function converts a string to camelCase, which is a naming convention where multiple words
 * are joined together and the first letter of each subsequent word is capitalized, except for the
 * first word.
 *
 * @param str - The input string to convert.
 * @returns A `Result` containing the converted string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Converting a string with spaces to camelCase:
 * ```typescript
 * toCamelCase('hello world')
 * // => { ok: true, value: 'helloWorld' }
 *```
 *
 * @example
 * Converting a string with hyphens to camelCase:
 * ```typescript
 * toCamelCase('foo-bar-baz')
 * // => { ok: true, value: 'fooBarBaz' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * toCamelCase(42)
 * // => { ok: false, error: Error('[strings.toCamelCase] Expected string value as input') }
 * ```
 */
export function toCamelCase(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toCamelCase] Expected string value as input'));
	}

	const regex = /[^a-zA-Z0-9]+(.)/g;
	const replacerFunc = (_: any, chr: string) => chr.toUpperCase();

	return normalize(str).andThen((s) =>
		lowercase(s).map((_s) => _s.replace(regex, replacerFunc).trim())
	);
}

/**
 * Converts a string to PascalCase.
 *
 * @remarks
 * This function converts a string to PascalCase, which is a naming convention where
 * the first letter of each word is capitalized and there are no spaces or other separators
 * between the words.
 *
 * If the input is not a string, this function returns a `Result` object containing an error.
 *
 * @param str - The string to convert.
 * @returns A `Result` object containing either the converted string or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Converting a string with spaces to PascalCase:
 * ```typescript
 * toPascalCase('hello world')
 * // => { ok: true, value: 'HelloWorld' }
 * ```
 *
 * @example
 * Converting a string with hyphens to PascalCase:
 * ```typescript
 * toPascalCase('foo-bar-baz');
 * // => { ok: true, value: 'FooBarBaz' }
 * ```
 *
 * @example
 * Handling non-string input:
 * ```typescript
 * toPascalCase(42);
 *  // => { ok: false, error: Error('[strings.toPascalCase] Expected string value as input') }
 * ```
 */
export function toPascalCase(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toPascalCase] Expected string value as input'));
	}

	const re = /[^a-zA-Z0-9]+(.)/g;
	const replacerFunc = (_: any, chr: string) => chr.toUpperCase();

	return normalize(str).andThen((s) =>
		lowercase(' ' + s).map((_s) => _s.replace(re, replacerFunc).trim())
	);
}

/**
 * Converts a camelCase string to snake_case.
 *
 * @remarks
 * This function expects a string input and returns a Result object containing either the
 * converted string on success or an error on failure.
 *
 * @param str - The camelCase string to convert.
 * @returns A `Result` object containing either the converted string or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Convert a camelCase string to snake_case:
 * ```typescript
 * camelToSnake('helloWorld')
 * // => { ok: true, value: 'hello_world' }
 *```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * camelToSnake(42);
 * // => { ok: false, error: Error('[strings.camelToSnake] Expected string value as input') }
 * ```
 */
export function camelToSnake(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.camelToSnake] Expected string value as input'));
	}
	const re = /[A-Z]/g;
	const replacerFunc = (chr: string) => '_' + chr.toLowerCase();

	return normalize(str).andThen((s) => ok(s.replace(re, replacerFunc)));
}

/**
 * Converts a camelCase string to kebab-case.
 *
 * @remarks
 * This function expects a string input and returns a Result object containing either the
 * converted string on success or an error on failure.
 *
 * @param str - The camelCase string to convert.
 * @returns A `Result` object containing either the converted string or an or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Convert a camelCase string to kebab-case:
 * ```typescript
 * camelToKebab('helloWorld');
 * // => { ok: true, value: 'hello-world' }
 * ```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * camelToKebab(42)
 * // => { ok: false, error: Error('[strings.camelToKebab] Expected string value as input') }
 * ```
 */
export function camelToKebab(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.camelToKebab] Expected string value as input'));
	}
	const re = /[A-Z]/g;
	const replacerFunc = (chr: string) => '-' + chr.toLowerCase();

	return normalize(str).andThen((s) => ok(s.replace(re, replacerFunc)));
}

/**
 * Checks if a string is comma-separated, i.e., contains one or more commas.
 *
 * @param str - The string to check for comma-separated format.
 * @returns A  boolean value indicating whether the input string is comma-separated (true) or not
 * (false).
 *
 * @example
 * ```typescript
 * isCommaSepareted("one, two, three")
 * // => true
 *
 *  isCommaSepareted("one")
 * // => false
 *
 * isCommaSepareted("one two three")
 * // => false
 * ```
 */
export function isCommaSepareted(str: string): boolean {
	return str.indexOf(',') >= 0;
}

/**
 * Converts a string to comma-separated format by replacing all non-word characters and underscores with commas.
 *
 * @param str - The string to convert to comma-separated format.
 * @returns A `Result` object with either the converted string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * ```typescript
 * toCommaSepareted("one two")
 * // => { ok: true, value: 'one,two' }
 *
 * toCommaSepareted("one;two")
 * // => { ok: true, value: 'one,two' }
 *
 * toCommaSepareted("one-two")
 * // => { ok: true, value: 'one,two' }
 *
 * toCommaSepareted("one_two")
 * // => { ok: true, value: 'one,two' }
 * ```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * toCommaSeparated(42)
 *  // => { ok: false, error: Error('[strings.toCommaSeparated] Expected string value as input') }
 * ```
 */
export function toCommaSepareted(str: string): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.toCommaSeparated] Expected string value as input'));
	}
	const re = /\W+|_+/g;
	return ok(str.replace(re, ','));
}

/**
 * Extracts text from between two substrings in a string.
 *
 * @param text - string - The string to extract text from.
 * @param startsWith - string - The starting substring.
 * @param endsWith - string - The ending substring.
 * @returns A `Result` object with either the extracted text on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * Here's a simple text extraction example:
 * ```typescript
 * const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
 * textBetween(text, 'ipsum', 'consectetur');
 * // => { ok: true, value: 'dolor sit amet,' }
 * ```
 *
 * @example
 * Here are some examples where the delimiters are special chars to escape:
 * ```typescript
 * textBetween('[music=zap]', '[', ']')
 * // => { ok: true, value: 'music=zap' }
 *
 * textBetween('^music=zap.', '^', '.')
 * // => { ok: true, value: 'music=zap' }
 *
 * textBetween('music&playlist?kc|zap', '?', '|')
 * // => { ok: true, value: 'kc' }
 * ```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * textBetween(42, '[', ']')
 *  // => { ok: false, error: Error('[strings.textBetween] Expected string value as input') }
 * ```
 */
export function textBetween(
	str: string,
	startsWith: string,
	endsWith: string
): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.textBetween] Expected string value as input'));
	}
	const result = str.match(`(?<=${_escape(startsWith)})(.*)(?=${_escape(endsWith)})`);
	return ok(result ? result[1].trim() : str);
}

/**
 *Removes the first occurrence of a substring from a string.
 *
 * @param text - The string to remove the substring from.
 * @param searchstr - The substring to remove.
 * @param trim - Optional. Whether to trim the resulting string. Defaults to true.
 * @defaultValue `trim = true`
 * @returns A `Result` object with either the resulting string on success, or an `Error` object
 * if the provided input is not a string.
 *
 * @example
 * ```typescript
 * removeFirstOccurrence('Hello World', 'lo')
 * // => { ok: true, value: 'Hel World' }
 *
 * removeFirstOccurrence('Hello World', 'lo', false)
 * // => { ok: true, value: 'Hel World' }
 *
 * removeFirstOccurrence('  Foo Bar  ', 'Bar')
 * // => { ok: true, value: '  Foo   ' }
 *
 * removeFirstOccurrence('Hello World', 'xyz')
 * // => { ok: true, value: 'Hello World' }
 *```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * removeFirstOccurrence(null, 'lo')
 * // => { ok: false, error: Error('[strings.removeFirstOccurrence] Expected string value as input') }
 *
 * removeFirstOccurrence('Hello World', null)
 * // => { ok: false, error: Error('[strings.removeFirstOccurrence] Expected string value for the searchstr parameter') }
 * ```
 */
export function removeFirstOccurrence(
	str: string,
	searchstr: string,
	trim = true
): Result<string, Error> {
	if (!isString(str)) {
		return err(new Error('[strings.removeFirstOccurrence] Expected string value as input'));
	}

	if (!isString(searchstr)) {
		return err(
			new Error('[strings.removeFirstOccurrence] Expected string value for the searchstr parameter')
		);
	}
	const index = str.indexOf(searchstr);
	if (index === -1) return ok(str);

	let start = str.slice(0, index);
	let end = str.slice(index + searchstr.length);

	if (trim) {
		start = start.trimStart();
		end = end.trimEnd();
	}

	return ok(start.concat(end));
}

// --------------------------------------------------------------------------------------

// Escape special characters [ \ ^ $ . | ? * + ( )
function _escape(value: string): string {
	switch (value) {
		case '[':
			return '\\[';
		case ']':
			return '\\]';
		case '(':
			return '\\(';
		case ')':
			return '\\)';
		case '{':
			return '\\{';
		case '}':
			return '\\}';
		case '/':
			return '\\/';
		case '^':
			return '\\^';
		case '$':
			return '\\$';
		case '.':
			return '\\.';
		case '-':
			return '\\-';
		case '|':
			return '\\|';
		case '?':
			return '\\?';
		case '*':
			return '\\*';
		case '+':
			return '\\+';
		case '\\':
			return '\\\\';
		default:
			return value;
	}
}
