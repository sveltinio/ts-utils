import { describe, it, expect } from 'vitest';
import { Ok, Err } from 'neverthrow';
import { canonicalURL, makeImagePath, defaultImage, parentUrl, parentPathname } from '../src/urls';

describe('canonicalURL', () => {
	it('should be https://example.com/welcome', () => {
		const url = 'https://example.com';
		const path = '/welcome';

		const result = canonicalURL(url, path);
		expect(result).toBe('https://example.com/welcome');
	});

	it('should be origin only', () => {
		const url = 'https://example.com';

		const result = canonicalURL(url);
		expect(result).toBe('https://example.com');
	});
});

describe('defaultImage', () => {
	it('should be a path to images/logs/logo.png', () => {
		const imagePath = defaultImage('http://localhost:3000');
		expect(imagePath).toBe('http://localhost:3000/images/logos/logo.png');
	});
});

describe('makeImagePath', () => {
	it('should be a path to an image file for the about page', () => {
		const imagePath = makeImagePath('http://localhost:3000', '', 'about', 'cover.png');
		expect(imagePath).toBe('http://localhost:3000/about/cover.png');
	});

	it('should be a path to an image file located in pages folder', () => {
		const imagePath = makeImagePath('   ', 'pages', 'about', 'cover.png');
		expect(imagePath).toBe('/pages/about/cover.png');
	});

	it('should be a path to an image file located in resources folder', () => {
		const imagePath = makeImagePath('   ', 'resources', 'posts/welcome', 'cover.png');
		expect(imagePath).toBe('/resources/posts/welcome/cover.png');
	});

	it('should be a path to an image file located in resources folder starting from a pathname with slashes', () => {
		const imagePath = makeImagePath('   ', 'resources', '/posts/welcome/', 'cover.png');
		expect(imagePath).toBe('/resources/posts/welcome/cover.png');
	});
});

describe('parentUrl', () => {
	it('should be https://example.com/blog/posts', () => {
		const want = 'https://example.com/blog/posts';
		const result = parentUrl('https://example.com/blog/posts/welcome') as Ok<string, never>;
		expect(result.value).toBe(want);
	});

	it('should be the url itself', () => {
		const want = 'https://example.com';
		const result = parentUrl('https://example.com') as Ok<string, never>;
		expect(result.value).toBe(want);
	});

	it('should be Error', () => {
		const result = parentUrl('foo/bar');
		expect(result.isErr()).toBe(true);
	});

	it('should be an error with "Expected a valid URL" as message', () => {
		const result: any = parentUrl('foo/bar') as Err<never, Error>;
		expect(result.isErr()).toBe(true);
		expect(result.error.message).toBe('Expected a valid URL');
		expect(result.error).toStrictEqual(new Error('Expected a valid URL'));
	});
});

describe('parentPathname', () => {
	it('should be blog as resulting pathname', () => {
		const want = 'blog';
		const result = parentPathname('https://example.com/blog/posts') as Ok<string, never>;
		expect(result.isOk()).toBe(true);
		expect(result.value).toBe(want);
	});

	it('should be blog/posts as resulting pathname', () => {
		const want = 'blog/posts';
		const result = parentPathname('https://example.com/blog/posts/welcome') as Ok<string, never>;
		expect(result.isOk()).toBe(true);
		expect(result.value).toBe(want);
	});

	it('should be an error with "Expected a valid URL" as message', () => {
		const result = parentPathname('foo/bar') as Err<never, Error>;
		expect(result.isErr()).toBe(true);
		expect(result.error.message).toBe('Expected a valid URL');
		expect(result.error).toStrictEqual(new Error('Expected a valid URL'));
	});
});
