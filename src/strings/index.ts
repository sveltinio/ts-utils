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
 * capitalizeFirstLetter("example");
 * ```
 */
export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
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
		capitalized.push(capitalizeFirstLetter(item));
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
