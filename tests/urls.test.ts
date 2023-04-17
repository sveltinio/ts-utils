import { describe, it, expect } from 'vitest';
import { Ok, Err } from 'neverthrow';
import {
	isUrl,
	canonicalUrl,
	makeImagePath,
	defaultImage,
	defaultSocialImage,
	parentUrl,
	parentPathname,
	pathSegments
} from '../src/urls';

describe('urls', () => {
	it('should be a valid URL', async () => {
		const url = 'https://www.facebook.com/20531316728/posts/10154009990506729/';
		expect(isUrl(url)).toBe(true);
	});

	it('should not be a valid url', async () => {
		const url = '20531316728/posts/10154009990506729/';
		expect(isUrl(url)).toBe(false);
	});
});

describe('canonicalUrl', () => {
	it('should be https://example.com/welcome', () => {
		const url = 'https://example.com';
		const path = '/welcome';

		const result = canonicalUrl(url, path);
		expect(result.href).toBe('https://example.com/welcome');
	});

	it('should be origin only', () => {
		const url = 'https://example.com';

		const result = canonicalUrl(url);
		expect(result.href).toBe('https://example.com/');
	});
});

describe('defaultImage', () => {
	it('should be a path to images/logs/logo.png', () => {
		const imagePath = defaultImage('http://localhost:3000');
		expect(imagePath).toBe('http://localhost:3000/images/logos/logo.png');
	});
});

describe('defaultSocialImage', () => {
	it('should be a path to images/socials.png', () => {
		const imagePath = defaultSocialImage('http://localhost:3000');
		expect(imagePath).toBe('http://localhost:3000/images/socials.png');
	});

	it('should be a path to assets/socials.png', () => {
		const imagePath = defaultSocialImage('http://localhost:3000', 'assets');
		expect(imagePath).toBe('http://localhost:3000/assets/socials.png');
	});

	it('should be a path to assets/github.png', () => {
		const imagePath = defaultSocialImage('http://localhost:3000', 'assets', 'github.png');
		expect(imagePath).toBe('http://localhost:3000/assets/github.png');
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

	it('should be a path to default image', () => {
		const imagePath = makeImagePath('   ', 'resources', '/posts/welcome/', '');
		expect(imagePath).toBe('/images/logos/logo.png');
	});

	it('should be a path to default image', () => {
		const imagePath = makeImagePath('/', 'resources', '/posts/welcome/', '');
		expect(imagePath).toBe('/images/logos/logo.png');
	});
});

describe('parentUrl', () => {
	it('should be https://example.com/blog/posts', () => {
		const want = 'https://example.com/blog/posts';
		const result = parentUrl('https://example.com/blog/posts/welcome') as Ok<URL, never>;
		expect(result.value.href).toBe(want);
	});

	it('should be the url itself', () => {
		const want = 'https://example.com/';
		const result = parentUrl('https://example.com/') as Ok<URL, never>;
		expect(result.value.href).toBe(want);
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

describe('pathSegments', () => {
	it('should return a string array', () => {
		const t = 'https://example.com/blog/welcome';
		const want = ['blog', 'welcome'];
		const result = pathSegments(t) as Ok<string[], never>;
		expect(result.value.length).toBe(want.length);
		expect(result.value).toEqual(want);
		expect(result.value[0]).toBe('blog');
	});

	it('should return Expected a valid URL as error message', () => {
		const t = 'example.com/blog/welcome';
		const result = pathSegments(t) as Err<never, Error>;
		expect(result.error.message).toBe('Expected a valid URL');
	});
});

describe('pathSegments', () => {
	it('should return a string array', () => {});
});
