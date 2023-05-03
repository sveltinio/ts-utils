/**
 * A bunch of utilities to deal with path strings.
 *
 * <ul>
 * <li>The functions below do not interface with the real file system but they are used to extract some information from the given path string. It means not ensuring e.g. a file exists or a folder is a real folder on the disk. For that, simply use what already exists like {@link https://nodejs.org/api/path.html | Node's modules}.</li>
 * <li>File and folder paths validation can be complex due to the variations in file path formats across different operating systems and file systems, e.g. both files and folders are valid even without extensions. </li>
 * </ul>
 *
 * @packageDocumentation
 */

import { Result, err, ok } from 'neverthrow';
import { isDefined, isEmpty, isString } from '../is/index.js';

/**
 * Checks if a given path is a valid directory path.
 *
 * @param path - The path to be checked.
 * @returns `true` if the path is a valid directory path, `false` otherwise.
 *
 * @example
 * ```
 * isDir('/home/demo/pictures')
 * // => true
 *
 * isDir('/home/demo/pictures/dummy.jpeg')
 * // => false
 *
 * isDir('C:\\Users\\Documents\\Folder1')
 * // => true
 *
 * isDir('/var/www/html')
 * // => true
 *
 * isDir('C:\\Users\\Documents\\File1.txt')
 * // => false
 * ```
 */
export function isDir(path: string): boolean {
	if (!isString(path)) return false;

	const unixRegex = /^(?!.*\/\0)[^\0]+(?<!\.\w+)$/;
	const windowsRegex = /^[a-zA-Z]:\\(?:[^\\\0]+\\)*[^\\\0]+(?<!\.\w+)$/;

	if (
		(path.startsWith('/') && unixRegex.test(path)) ||
		(path.match(/^[a-zA-Z]:\\/) && windowsRegex.test(path))
	) {
		return true;
	} else {
		return false;
	}
}

/**
 * Checks if a given path is a valid file path.
 *
 * @param path -The path to be checked.
 * @returns `true` if the path is a valid file path, `false` otherwise.
 *
 * @example
 * ```
 * isFile('/home/demo/pictures/dummy.jpeg')
 * // => true
 *
 * isFile('/home/demo/pictures)
 * // => true
 *
 * isFile('/home/demo/pictures/)
 * // => false
 *
 * isFile('C:\\Users\\Documents\\File1.txt')
 * // => true
 *
 * isFile('/var/www/html/index.html')
 * // => true
 *
 * isFile('C:\\Users\\Documents\\Folder1')
 * // => false
 * ```
 */
export function isFile(path: string): boolean {
	if (!isString(path)) return false;

	const unixRegex = /^(?!.*\/\0)[^\0]+(\.[^\\/\0]+)?$/;
	const windowsRegex = /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/;

	return (unixRegex.test(path) && !path.endsWith('/')) || windowsRegex.test(path);
}

/**
 * Extracts the directory name from a given file path.
 *
 * @param path - The file path from which to extract the directory name.
 * @returns A `Result` object containing the directory name as a `string` on success,
 * or an `Error` object if the provided input is not a string.
 *
 * @example
 * ```
 * dirname('/home/demo/pictures/dummy.jpeg').value
 * // => "/home/demo/pictures"
 *
 * dirname('/home/demo/pictures').value
 * // => "/home/demo/"
 *
 * dirname('C:/Users/Documents/File1.txt').value
 * // => 'C:/Users/Documents'
 *
 * dirname('/var/www/html/index.html').value
 * // => '/var/www/html'
 *
 * dirname('C:/Users/Documents/Folder1').value
 * // => 'C:/Users/Documents'
 *
 * const dname = dirname(12345)
 * dname.isOk()
 * // => false
 * dnane.isErr()
 * // true
 * dname.error.message
 * // Outputs an error => '[paths.dirname] The given path must be a string'
 * ```
 */
export function dirname(path: string): Result<string, Error> {
	if (!isString(path)) {
		return err(new Error('[paths.dirname] The given path must be a string'));
	}

	// Matches either backslash (\) or forward slash (/) as directory separator
	const separator = /[\\\\/]/;
	const parts = path.split(separator);
	if (parts.length === 1) {
		// one part only, the given path is just a file name
		return ok(path);
	}

	// Otherwise, to get the full directory path joining the parts up to the second-to-last
	// part with the directory separator that's present in the original file path
	const separatorUsed = path.includes('\\') ? '\\' : '/';
	const directoryName = parts.slice(0, parts.length - 1).join(separatorUsed);
	return ok(directoryName);
}

/**
 * Extracts the filename from a given file path.
 *
 * @param path - The file path from which to extract the filename.
 * @returns A `Result` object containing the filename as a `string` on success,
 * or an `Error` object if the provided input is not a string.
 *
 * @example
 * ```
 * filename('/home/demo/pictures/dummy.jpeg').value
 * // => "dummy.jpeg"
 *
 * filename('/home/demo/profile').value
 * // => "profile"
 *
 * filename('/home/demo/pictures/').value
 * // => ""
 *
 * filename('C:\\Users\\Documents\\File1.txt').value
 * // => 'File1.txt'
 *
 * filename('/var/www/html/index.html').value
 * // => 'index.html''
 *
 * filename('https://example.com/assets/image.png').value
 * // => 'image.png'
 *
 * const fname = filename(12345)
 * fname.isOk()
 * // => false
 * fname.isErr()
 * // true
 * fname.error.message
 * // => '[paths.filename] Expected string value as input'
 * ```
 */
export function filename(path: string): Result<string, Error> {
	if (!isString(path)) {
		return err(new Error('[paths.filename] Expected string value as input'));
	}

	return ok(isFile(path) ? path.replace(/^.*[\\\\/]/, '') : '');
}

/**
 * Checks if a given string represents an image file path with extensions such
 * as jpg, jpeg, png, gif, webp, or avif.
 *
 * @param str - The string to be checked.
 * @returns `true` if the given string represents an image file path, `false` otherwise.
 *
 * @example
 * ```
 * isImage('dummy.jpeg')
 * // => true
 *
 * isImage('dummy.weBp')
 * // => true
 *
 * isImage('dummy.PNG')
 *
 * // => true
 *
 * isImage('dummy.docx')
 * // => false
 *
 * isImage('/home/demo/dummy')
 * // => false
 *
 * isImage(undefined)
 * // => false
 * ```
 */
export function isImage(path: string): boolean {
	if (!isDefined(path) || !isString(path) || !isFile(path)) return false;

	const imageRegex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|webp|avif)$/i);

	return imageRegex.test(path);
}

/**
 * Returns the last segment of a given path string.
 *
 * @param path - The path string.
 * @returns A `Result` with the last segment as a string on success, and an `Error` object if the
 * provided input is not a string.
 *
 * @example
 * ```
 * lastSegment('/home/user/documents/file.txt').value
 * // => file.txt
 *
 * lastSegment('/home/user/documents/').value
 * // => ''
 *
 * lastSegment('/home/user/documents').value
 * //  => 'documents'
 *
 * lastSegment('file.txt').value
 * //  => 'file.txt'
 *
 * lastSegment('').value
 * // => ''
 *
 * const seg1 = lastSegment(null)
 * seg1.isOk()
 * // => false
 * seg1.isErr()
 * // => true
 * seg1.error.message
 * // => [paths.lastSegment] Expected string value as input
 *
 * const seg2 = lastSegment(12345)
 * seg2.isOk()
 * // => false
 * seg2.isErr()
 * // => true
 * seg2.error.message
 * // => Error: [paths.lastSegment] Expected string value as input
 * ```
 */
export function lastSegment(path: string): Result<string, Error> {
	if (!isString(path)) {
		return err(new Error('[paths.lastSegment] Expected string value as input'));
	}

	// Unix root path
	const unixRegex = /^\/$/;
	// Windows drive letter path (with or without escaping)
	const windowsRegex = /^([a-z]:)\\$/i;

	if (unixRegex.test(path) || windowsRegex.test(path)) {
		return ok('');
	}

	const separator = /[\\/]/; // Match both Windows and Unix separators
	const segments = path.split(separator); // Split the path by separator
	const lastSegment = segments[segments.length - 1]; // Get the last segment

	// If the last segment is an empty string, it means the path ended with a separator
	// In that case, we get the second-to-last segment as the last segment
	if (isEmpty(lastSegment)) {
		return ok(segments[segments.length - 2] || '');
	}

	return ok(lastSegment);
}
