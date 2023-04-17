/**
 * The function extracts the directory name from a given file path. It uses a regular expression to
 * match the last occurrence of a forward slash or backslash in the path, and returns everything
 * before that as the directory name. If there is no slash in the path, an empty string is returned.
 *
 * @param {string} thePath - The input parameter "thePath" is a string representing a file path.
 *
 * @returns the directory name of the given path.
 */
export function dirname(thePath: string): string {
	const result = thePath.match(/(.*)[\\/\\]/);
	return result ? result[1] : '';
}

/**
 * The function extracts the filename from a given file path string. It takes a string argument
 * `thePath` and returns the filename from the path by removing everything before the last forward slash or backslash character.
 *
 * @param {string} thePath - thePath is a string parameter that represents the file path from which
 * we want to extract the file name.
 *
 * @returns a string value. The filename.
 */
export function filename(thePath: string): string {
	return thePath.replace(/^.*[\\\\/]/, '');
}

/**
 * The function checks if a given string is a valid image file name with extensions such
 * as jpg, jpeg, png, gif, webp, or avif.
 *
 * @param {string} str - a string that represents a file name or URL.
 *
 * @returns a boolean value. It returns `true` if the input string matches the regular expression
 * pattern for an image file (ending in .jpg, .jpeg, .png, .gif, .webp, or .avif), and `false`
 * otherwise.
 */
export function isImage(str: string): boolean {
	if (!filename(str)) return false;
	const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|webp|avif)$/i);

	if (str == null || typeof str === 'undefined') return false;

	if (regex.test(str) == true) return true;

	return false;
}

/**
 * The function returns the last segment of a given path string.
 *
 * @param {string} thePath - The input string representing a file path or URL.
 *
 * @returns  the last segment of a given path string.
 */
export function lastSegment(thePath: string): string {
	return thePath.substring(thePath.lastIndexOf('/') + 1);
}
