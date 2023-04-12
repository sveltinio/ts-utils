/* eslint-disable no-useless-escape */
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
 * It takes a string, replaces all dashes with spaces, and capitalizes all words.
 *
 * @param str - string -  The string to be converted.
 *
 * @returns The given string as title text.
 *
 * @example
 * ```
 * // Prints "Getting Started":
 * toTitle("getting-started");
 * ```
 */
export function toTitle(str: string): string {
	return capitalizeAll(str.replace(/-/g, ' '));
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
		.replace(/ +/g, '-');
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
	const regex = new RegExp(`${_escape(startsWith)}(.*)${_escape(endsWith)}+$`);
	const result = text.match(regex);

	return result ? result[1].trim() : text;
}

// --------------------------------------------------------------------------------------

// Escape special characters [ \ ^ $ . | ? * + ( )
function _escape(value: string): string {
	switch (value) {
		case '[':
			return '[';
		case ']':
			return ']';
		case '/':
			return '/';
		case '^':
			return '^';
		case '$':
			return '$';
		case '.':
			return '.';
		case '|':
			return '|';
		case '?':
			return '?';
		case '*':
			return '*';
		case '+':
			return '+';
		case '(':
			return '(';
		case ')':
			return ')';
		default:
			return value;
	}
}
