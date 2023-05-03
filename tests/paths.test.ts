import { describe, it, expect } from 'vitest';
import { isDir, isFile, lastSegment, dirname, filename, isImage } from '../src/paths/index.js';
import { ok } from 'neverthrow';

describe('isDir', () => {
	it('should be true', () => {
		expect(isDir('/home/demo/pictures')).toBe(true);
		expect(isDir('/home/demo/pictures/')).toBe(true);
		expect(isDir('C:\\Users\\Documents')).toBe(true);
	});

	it('should be false', () => {
		expect(isDir('/home/demo/pictures/dummy.jpeg')).toBe(false);
		expect(isDir('C:\\Users\\Documents\\File1.txt')).toBe(false);
	});

	it('should be false for non string input', () => {
		expect(isDir(10)).toBe(false);
	});
});

describe('isFile', () => {
	it('should be true', () => {
		expect(isFile('/home/demo/pictures/dummy.jpeg')).toBe(true);
		expect(isFile('/home/demo/profile')).toBe(true);
		expect(isFile('C:\\Users\\Documents\\File1.txt')).toBe(true);
	});

	it('should be false', () => {
		expect(isFile('/home/demo/pictures/')).toBe(false);
	});

	it('should be false for non string input', () => {
		expect(isFile(10)).toBe(false);
	});
});

describe('dirname', () => {
	it('should be pictures', () => {
		const result = dirname('/home/demo/pictures/dummy.jpeg');
		expect(result).toEqual(ok('/home/demo/pictures'));
	});

	it('should be C:\\Users\\Documents', () => {
		expect(dirname('C:\\Users\\Documents\\File1.txt')).toEqual(ok('C:\\Users\\Documents'));
	});

	it('should be /home/demo', () => {
		const result = dirname('/home/demo/pictures');
		expect(result).toEqual(ok('/home/demo'));
	});

	it('should be file.txt, the given path is just a file name', () => {
		const result = dirname('file.txt');
		expect(result).toEqual(ok('file.txt'));
	});

	it('should be C:', () => {
		const result = dirname('C:\\');
		expect(result).toEqual(ok('C:'));
	});

	it('should be https://example.com/assets/', () => {
		expect(dirname('https://example.com/assets/image.png')).toEqual(
			ok('https://example.com/assets')
		);
	});

	it('should be an error with "[paths.dirname] The given path must be a string"', () => {
		const result = dirname(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[paths.dirname] The given path must be a string'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[paths.dirname] The given path must be a string')
		);
	});
});

describe('filename', () => {
	it('should be dummy.jpeg', () => {
		expect(filename('/home/demo/pictures/dummy.jpeg')).toEqual(ok('dummy.jpeg'));
	});

	it('should be File1.txt', () => {
		expect(filename('C:\\Users\\Documents\\File1.txt')).toEqual(ok('File1.txt'));
	});

	it('should be image.png', () => {
		expect(filename('https://example.com/assets/image.png')).toEqual(ok('image.png'));
	});

	it('should be the same as the given input', () => {
		expect(filename('/home/demo/pictures/')).toEqual(ok(''));
	});

	it('should be an error with "[paths.filename] Expected string value as input"', () => {
		const result = filename(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[paths.filename] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[paths.filename] Expected string value as input')
		);
	});
});

describe('isImage', () => {
	it('should be true', () => {
		expect(isImage('dummy.jpeg')).toBe(true);
		expect(isImage('dummy.weBp')).toBe(true);
		expect(isImage('dummy.PNG')).toBe(true);
		expect(isImage('dummy.Avif')).toBe(true);
		expect(isImage('dummy.GIF')).toBe(true);
	});

	it('should be false for a .docx file', () => {
		expect(isImage('dummy.docx')).toBe(false);
	});

	it('should be false when no filename', () => {
		expect(isImage('/home/demo/dummy')).toBe(false);
	});

	it('should be false when empty string', () => {
		expect(isImage('')).toBe(false);
	});

	it('should be false for not defined input', () => {
		expect(isImage(undefined)).toBe(false);
	});
});

describe('lastSegment', () => {
	it('should be pictures', () => {
		expect(lastSegment('/home/demo/pictures/')).toEqual(ok('pictures'));
		expect(lastSegment('C:\\Users\\John\\Documents\\pictures')).toEqual(ok('pictures'));
	});

	it('should be dummy.jpg', () => {
		expect(lastSegment('/home/demo/pictures/dummy.jpg')).toEqual(ok('dummy.jpg'));
		expect(lastSegment('C:\\Users\\John\\Documents\\dummy.jpg')).toEqual(ok('dummy.jpg'));
	});

	it('should be empty strings', () => {
		expect(lastSegment('C:\\')).toEqual(ok(''));
		expect(lastSegment('C:\\\\')).toEqual(ok(''));
		expect(lastSegment('/')).toEqual(ok(''));
	});

	it('should be an error with "[paths.lastSegment] Expected string value as input"', () => {
		const result = lastSegment(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[paths.lastSegment] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[paths.lastSegment] Expected string value as input')
		);
	});
});
