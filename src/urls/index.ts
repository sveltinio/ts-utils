/**
 * A bunch of utilities to deal with urls.
 *
 * @packageDocumentation
 */

import { isEmpty, isString } from '../is/index.js';
import { textBetween } from '../strings/index.js';
import { ok, err, Result } from 'neverthrow';

/**
 * Checks if a given string is a valid URL.
 *
 * @param url - The string to check if it's a valid URL.
 * @returns `true` if the string is a valid URL, false otherwise.
 *
 * @example
 * ```typescript
 * isUrl("https://www.typescriptlang.org/")
 * // => true
 *
 * isUrl("20531316728/posts/10154009990506729/")
 * // => false
 * ```
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
 * Creates a canonical URL by combining a base URL and an optional pathname.
 *
 * @param baseURL - The base URL to be used for creating the canonical URL.
 * @param pathname - An optional pathname to be appended to the base URL.
 * Defaults to an empty string.
 * @returns A `Result` object containing a URL instance if the URL is valid,
 * or an `Error` object if the base URL is not valid.
 *
 * @example
 * ```typescript
 * const url = 'https://example.com';
 * const path = '/welcome';
 * canonicalUrl(url, path)
 * // => { ok: true, value: 'https://example.com/welcome' }
 *```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * canonicalUrl("/welcome")
 * // => { ok: false, error: Error('[urls.canonicalUrl] Expected a valid URL') }
 * ```
 */
export function canonicalUrl(baseURL: string, pathname = ''): Result<URL, Error> {
	if (!isUrl(baseURL)) {
		return err(new Error('[urls.canonicalUrl] Expected a valid URL'));
	}
	if (!isString(pathname)) {
		return err(new Error('[urls.canonicalUrl] Expected string value for the pathname parameter'));
	}

	const urlString = _trim(baseURL).concat(pathname);
	return ok(new URL(urlString));
}

/**
 * Returns a Result object with either a URL instance representing the parent URL if the given URL
 * is valid, or an Error if the given URL is not valid.
 *
 * @param url - The URL for which the parent URL needs to be retrieved.
 * @returns  A `Result` object containing a URL instance representing the parent URL if the given
 * URL is valid, or an `Error` object if the given URL is not valid.
 *
 * @example
 * ```
 * parentUrl("https://example.com/blog/posts/welcome/")
 * // => { ok: true, value: 'https://example.com/blog/posts' }
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * parentUrl("/welcome")
 * // => { ok: false, error: Error('[urls.parentUrl] Expected a valid URL') }
 * ```
 */
export function parentUrl(url: string): Result<URL, Error> {
	if (!isUrl(url)) {
		return err(new Error('[urls.parentUrl] Expected a valid URL'));
	}

	const result = new URL(url).href.substring(0, new URL(url).href.lastIndexOf('/'));
	return ok(new URL(result));
}

/**
 * Retrieves the parent pathname of a given URL by removing the last segment of the pathname.
 *
 * @param url - The URL for which the parent pathname needs to be retrieved.
 * @returns A `Result` object with either a string representing the parent pathname if the given URL
 * is valid, or an `Error` object if the given URL is not valid.
 *
 * @example
 * ```typescript
 * parentPathname("https://www.example.com/page/subpage")
 * // => { ok: true, value: 'page' }
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * parentPathname("page/subpage")
 * // => { ok: false, error: Error('[urls.parentPathname] Expected a valid URL') }
 * ```
 */
export function parentPathname(url: string): Result<string, Error> {
	if (!isUrl(url)) {
		return err(new Error('[urls.parentPathname] Expected a valid URL'));
	}

	const path = new URL(url).pathname.split('/');
	const noEmptySegments = path.filter((s: string) => s !== '');

	noEmptySegments.pop(); // remove the last
	return ok(noEmptySegments.join('/'));
}

/**
 * Retrieves the segments of the pathname from a given URL as an array of strings.
 *
 * @param url - The URL for which the pathname segments need to be retrieved.
 * @returns  A `Result` object with either an array of strings representing the path segments if the
 * given URL is valid, or an `Error` object if the given URL is not valid.
 *
 * @example
 * ```typescript
 * pathSegments(https://www.example.com/page/subpage")
 * // => { ok: true, value: ['page', 'subpage'] }
 * ```
 *
 * @example
 * Handle an invalid input:
 * ```typescript
 * pathSegments("blog/posts/welcome/").error.message
 * // => { ok: false, error: Error('[urls.pathSegments] Expected a valid URL') }
 *
 * pathSegments(null)
 * // => { ok: false, error: Error('[urls.pathSegments] Expected a valid URL') }
 * ```
 */
export function pathSegments(url: string): Result<string[], Error> {
	if (!isUrl(url)) {
		return err(new Error('[urls.pathSegments] Expected a valid URL'));
	}

	const result = new URL(url).pathname.split('/').filter((part) => part?.trim() !== '');
	return ok(result);
}

/**
 * Generates a default image URL by concatenating the base URL, folder, and filename.
 *
 * @param baseURL - The base URL to be used for generating the default image URL.
 * @param folder - The folder path to be appended to the base URL. Defaults to 'images/logos'.
 * @param filename - The filename to be appended to the base URL and folder. Defaults to 'logo.png'.
 * @returns A `Result` object containing a string representing the default image URL if all inputs
 * are valid strings, or an `Error` object if any of the inputs are not valid strings.
 *
 * @example
 * ```typescript
 * defaultImage('https://www.example.com')
 * // => { ok: true, value: 'https://www.example.com/images/logos/logo.png' }
 *
 * defaultImage('https://www.example.com', 'assets')
 * // => { ok: true, value: 'https://www.example.com/assets/logo.png' }
 * ```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * defaultSocialImage(null)
 * // => { ok: false, error: Error('[urls.defaultImage] Expected string values for all parameters') }
 * ```
 */
export function defaultImage(
	baseURL: string,
	folder = 'images/logos',
	filename = 'logo.png'
): Result<string, Error> {
	if (!isString(baseURL) || !isString(folder) || !isString(filename)) {
		return err(new Error('[urls.defaultImage] Expected string values for all parameters'));
	}

	return ok(_makePathToImageFile(baseURL, folder, filename));
}

/**
 * Generates a default social image URL by concatenating the base URL, folder, and filename.
 *
 * @param baseURL - The base URL to be used for generating the default social image URL.
 * @param folder - The folder path to be appended to the base URL. Defaults to 'images'.
 * @param filename - The filename to be appended to the base URL and folder. Defaults to 'socials.png'.
 * @returns A `Result` object with either a string representing the default social image URL if all
 * inputs are valid strings, or an `Error` object if any of the inputs are not valid strings.
 *
 * @example
 * ```typescript
 * defaultSocialImage('https://www.example.com')
 * // => { ok: true, value: 'https://www.example.com/images/socials.png' }
 *
 * defaultSocialImage('https://www.example.com', 'assets')
 * // => { ok: true, value: 'https://www.example.com/assets/socials.png' }
 *
 * defaultSocialImage('https://www.example.com', 'assets', 'github.png')
 * // => { ok: true, value: 'https://www.example.com/assets/github.png' }
 * ```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * defaultSocialImage(null)
 * // => { ok: false, error: Error('[urls.defaultSocialImage] Expected string values for all parameters') }
 * ```
 */
export function defaultSocialImage(
	baseURL: string,
	folder = 'images',
	filename = 'socials.png'
): Result<string, Error> {
	if (!isString(baseURL) || !isString(folder) || !isString(filename)) {
		return err(new Error('[urls.defaultSocialImage] Expected string values for all parameters'));
	}

	return ok(_makePathToImageFile(baseURL, folder, filename));
}

/**
 * Generates an image path URL by concatenating the base URL, artifact, pathname, and filename.
 *
 * @param baseURL - The base URL to be used for generating the image path URL.
 * @param artifact - The artifact type to be used for generating the image path URL. It can be 'pages' | 'resources' | ''. Defaults to an empty string ('').
 * @param pathname - The pathname to be appended to the base URL and artifact.
 * @param filename - The filename to be appended to the base URL, artifact, and pathname.
 * @returns A `Result` object with either a string representing the image path URL if all inputs are
 * valid strings, or an `Error` object if any of the inputs are not valid strings.
 *
 * @example
 * ```typescript
 *  makeImagePath('', 'pages', 'about', 'cover.png')
 * // => { ok: true, value: '/pages/about/cover.png' }
 *
 * makeImagePath('', 'resources', 'posts/welcome', 'cover.png')
 * // => { ok: true, value: '/resources/posts/welcome/cover.png' }
 *
 * makeImagePath('https://www.example.com', '', 'about', 'cover.png')
 * // => { ok: true, value: '/about/cover.png' }
 * ```
 *
 * @example
 * Handle an invalid input string:
 * ```typescript
 * makeImagePath(null)
 * // => { ok: false, error: Error('[urls.makeImagePath] Expected string values for all parameters') }
 * ```
 */
export function makeImagePath(
	baseURL: string,
	artifact: 'pages' | 'resources' | '' = '',
	pathname: string,
	filename: string
): Result<string, Error> {
	if (!isString(baseURL) || !isString(artifact) || !isString(pathname) || !isString(pathname)) {
		return err(new Error('[urls.makeImagePath] Expected string values for all parameters'));
	}

	if (filename && !isEmpty(filename)) {
		return textBetween(pathname, '/', '/')
			.map((p) => {
				const folder = artifact != '' ? artifact.concat('/', p) : p;
				return _makePathToImageFile(baseURL, folder.toString(), filename);
			})
			.mapErr((e) => e);
	}

	return defaultImage(baseURL);
}

// --------------------------------------------------------------------------------------

function _makePathToImageFile(baseURL: string, folder: string, filename: string): string {
	return _trim(baseURL).concat('/', folder, '/', filename);
}

function _trim(value: string): string {
	let base = value.trim();
	if (base === '/') base = '';
	return base;
}
