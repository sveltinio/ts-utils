import { describe, it, expect } from 'vitest';
import { lastSegment, dirname, filename, isImage } from '../src/paths';

describe('dirname', () => {
	it('should be pictures', () => {
		expect(dirname('/home/demo/pictures/dummy.jpeg')).toBe('/home/demo/pictures');
	});
});

describe('filename', () => {
	it('should be dummy.jpeg', () => {
		expect(filename('/home/demo/pictures/dummy.jpeg')).toBe('dummy.jpeg');
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
});

describe('lastSegment', () => {
	it('should be pictures', () => {
		expect(lastSegment('/home/demo/pictures')).toBe('pictures');
	});
});
