import { isEmpty } from '../index.js';
import { textBetween } from '../strings/index.js';
import { ok, err, Ok, Err } from 'neverthrow';

/**
 * The function checks if a given string is a valid URL.
 * @param {string} url - string parameter representing a URL that needs to be validated.
 * @returns The function `isUrl` returns a boolean value (`true` or `false`) depending on whether the
 * input `url` is a valid URL or not. If the input `url` can be successfully parsed as a URL using the
 * `URL` constructor, the function returns `true`. Otherwise, if an error is thrown during parsing, the
 * function returns `false`.
 */
export function isUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}
/**
 * It takes a base URL and a pathname and returns a canonical URL.
 *
 * @param baseURL - string - The base URL of the site.
 * @param pathname - string - `''`  The pathname of the URL.
 *
 * @returns A string representing the canonical URL.
 */
export function canonicalUrl(baseURL: string, pathname = ''): URL {
	const urlString = _trim(baseURL).concat(pathname);
	return new URL(urlString);
}

/**
 * This function takes a URL, and returns a string that is the parent url
 * without the last segment of the it.
 *
 * @param url - string - The base URL of the website.
 *
 * @returns A string representing the parent url of the given URL.
 *
 * @example
 * ```
 *  // Prints "https://example.com/blog/posts":
 * parentUrl("https://example.com/blog/posts/welcome/").value
 *
 * ```
 */
export function parentUrl(url: string): Err<never, Error> | Ok<URL, never> {
	let result = '';
	if (!isUrl(url)) {
		return err(new Error('Expected a valid URL'));
	} else {
		result = new URL(url).href.substring(0, new URL(url).href.lastIndexOf('/'));
		return ok(new URL(result));
	}
}

/**
 * This function takes a URL, and returns a string that is the pathname
 * without the last segment of the it.
 *
 * @param url - string - The base URL of the website.
 *
 * @returns A string representing the parent pathname of the given URL.
 *
 * @example
 * ```
 *  // Prints "blog/posts":
 * parentPathname("https://example.com/blog/posts/welcome/").value
 *
 * ```
 */
export function parentPathname(url: string): Err<never, Error> | Ok<string, never> {
	if (!isUrl(url)) {
		return err(new Error('Expected a valid URL'));
	} else {
		const path = new URL(url).pathname.split('/');
		const noEmptySegments = path.filter((s: string) => s !== '');

		noEmptySegments.pop(); // remove the last
		return ok(noEmptySegments.join('/'));
	}
}

/**
 * The function extracts the path segments from a valid URL and returns them as an array, or
 * returns an error if the input is not a valid URL.
 *
 * @param {string} url - A string representing a URL.
 *
 * @returns An array of string segments extracted from the path of the input `url`.
 */
export function pathSegments(url: string): Err<never, Error> | Ok<string[], never> {
	if (!isUrl(url)) {
		return err(new Error('Expected a valid URL'));
	} else {
		const result = new URL(url).pathname.split('/').filter((part) => part?.trim() !== '');
		return ok(result);
	}
}

/**
 * It returns the path to the default image for the application.
 *
 * @param baseURL - string - The base URL of the site.
 * @param folder - string - `images/logos` - the folder where the image is located.
 * @param filename - string - `logo.png` - The name of the image file
 *
 * @returns A string representing the full qualified path to the default image file.
 */
export function defaultImage(
	baseURL: string,
	folder = 'images/logos',
	filename = 'logo.png'
): string {
	return _makePathToImageFile(baseURL, folder, filename);
}

/**
 * It returns the path to the default image used for socials sharings.
 *
 * @param baseURL - string - The base URL of the site.
 * @param folder - string - `images` - the folder where the image is located.
 * @param filename - string - `socials.png` - The name of the image file
 *
 * @returns A string representing the full qualified path to the default image file for socials sharings.
 */
export function defaultSocialImage(
	baseURL: string,
	folder = 'images',
	filename = 'socials.png'
): string {
	return _makePathToImageFile(baseURL, folder, filename);
}

export type artifactType = '' | 'pages' | 'resources';

/**
 * It returns the image URL for a page, or a default image if the page doesn't have an image.
 *
 * @param baseURL - string - The base URL of the site.
 * @param artifact - artifactType - `''`, The type of image you want to get. '' | 'pages' | 'resources'.
 * @param pathname - string - The path to the page, e.g. /welcome
 * @param filename - string - The name of the image file.
 *
 * @returns A string representing the full qualified path to the image file
 */
export function makeImagePath(
	baseURL: string,
	artifact: artifactType = '',
	pathname: string,
	filename: string
) {
	if (filename && !isEmpty(filename)) {
		const cleanedPath = textBetween(pathname, '/', '/');

		const folder = artifact != '' ? artifact.concat('/', cleanedPath) : cleanedPath;
		return _makePathToImageFile(baseURL, folder, filename);
	}
	return defaultImage(baseURL);
}

// --------------------------------------------------------------------------------------

/**
 * This function takes a base URL, a folder, and a filename, and returns a string that is the
 * concatenation of the base URL, the folder, and the filename.
 *
 * @param baseURL - string - The base URL of the website.
 * @param folder - string - The folder where the image is located.
 * @param filename - string - The name of the image file.
 *
 * @returns A string representing the full qualified path to the image file.
 */
function _makePathToImageFile(baseURL: string, folder: string, filename: string): string {
	return _trim(baseURL).concat('/', folder, '/', filename);
}

function _trim(value: string): string {
	let base = value.trim();
	if (base === '/') base = '';
	return base;
}
