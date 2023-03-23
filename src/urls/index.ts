import { DEV } from 'esm-env';
import { isEmpty } from '../index.js';
import { textBetween } from '../strings/index.js';

export function getBaseURL(devBase: string, prodBase: string): string {
	return DEV ? devBase : prodBase;
}

/**
 * It takes a base URL and a pathname and returns a canonical URL.
 *
 * @param baseURL - string - The base URL of the site.
 * @param pathname - string - `''`  The pathname of the URL.
 *
 * @returns A string representing the canonical URL.
 */
export function canonicalURL(baseURL: string, pathname = ''): string {
	return _trim(baseURL).concat(pathname);
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
