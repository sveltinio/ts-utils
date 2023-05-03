import { describe, it, expect } from 'vitest';
import { ok } from 'neverthrow';
import {
	isUrl,
	canonicalUrl,
	makeImagePath,
	defaultImage,
	defaultSocialImage,
	parentUrl,
	parentPathname,
	pathSegments
} from '../src/urls/index.js';

describe('urls', () => {
	it('should be valid URLs', async () => {
		const validUrls = [
			'https://www.example.com',
			'ftp://ftp.example.com',
			'mailto:example@example.com',
			'tel:+1234567890',
			'data:image/png;base64,iVBORw0KGg....',
			'https://www.facebook.com/20531316728/posts/10154009990506729',
			'https://example.com/search?q=hello&lang=en'
		];

		validUrls.forEach((url) => expect(isUrl(url)).toBe(true));
	});

	it('should not be a valid URLs', async () => {
		const invalidUrls = ['invalid-url', '20531316728/posts/10154009990506729/'];

		invalidUrls.forEach((url) => expect(isUrl(url)).toBe(false));
	});
});

describe('canonicalUrl', () => {
	it('should be https://example.com/welcome', () => {
		const url = 'https://example.com';
		const path = '/welcome';

		const result = canonicalUrl(url, path);
		expect(result.map((url) => url.href)).toEqual(ok('https://example.com/welcome'));
		expect(result._unsafeUnwrap().href).toBe('https://example.com/welcome');
	});

	it('should be origin only', () => {
		const url = 'https://example.com';

		const result = canonicalUrl(url);
		expect(result.map((url) => url.href)).toEqual(ok('https://example.com/'));
	});

	it('should be an error with "[urls.canonicalUrl] Expected a valid URL" as message', () => {
		const result = canonicalUrl(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe('[urls.canonicalUrl] Expected a valid URL');
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.canonicalUrl] Expected a valid URL')
		);
	});

	it('should be an error with "[urls.canonicalUrl] Expected string value for the pathname parameter" as message', () => {
		const result = canonicalUrl('https://example.com', 10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[urls.canonicalUrl] Expected string value for the pathname parameter'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.canonicalUrl] Expected string value for the pathname parameter')
		);
	});
});

describe('defaultImage', () => {
	it('should be a path to images/logs/logo.png', () => {
		const imagePath = defaultImage('http://localhost:3000');
		expect(imagePath).toEqual(ok('http://localhost:3000/images/logos/logo.png'));
	});

	it('should be a path to assets/socials.png', () => {
		const imagePath = defaultImage('http://localhost:3000', 'assets');
		expect(imagePath).toEqual(ok('http://localhost:3000/assets/logo.png'));
	});

	it('should be an error with "[urls.defaultImage] Expected string values for all prameters" as message', () => {
		const result = defaultImage(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[urls.defaultImage] Expected string values for all parameters'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.defaultImage] Expected string values for all parameters')
		);
	});
});

describe('defaultSocialImage', () => {
	it('should be a path to images/socials.png', () => {
		const imagePath = defaultSocialImage('http://localhost:3000');
		expect(imagePath).toEqual(ok('http://localhost:3000/images/socials.png'));
	});

	it('should be a path to assets/socials.png', () => {
		const imagePath = defaultSocialImage('http://localhost:3000', 'assets');
		expect(imagePath).toEqual(ok('http://localhost:3000/assets/socials.png'));
	});

	it('should be a path to assets/github.png', () => {
		const imagePath = defaultSocialImage('http://localhost:3000', 'assets', 'github.png');
		expect(imagePath).toEqual(ok('http://localhost:3000/assets/github.png'));
	});

	it('should be an error with "[urls.defaultSocialImage] Expected string values for all parameters" as message', () => {
		const result = defaultSocialImage(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[urls.defaultSocialImage] Expected string values for all parameters'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.defaultSocialImage] Expected string values for all parameters')
		);
	});
});

describe('makeImagePath', () => {
	it('should be a path to an image file for the about page', () => {
		const imagePath = makeImagePath('http://localhost:3000', '', 'about', 'cover.png');

		expect(imagePath).toEqual(ok('http://localhost:3000/about/cover.png'));
	});

	it('should be a path to an image file located in pages folder', () => {
		const imagePath = makeImagePath('   ', 'pages', 'about', 'cover.png');
		expect(imagePath).toEqual(ok('/pages/about/cover.png'));
	});

	it('should be a path to an image file located in resources folder', () => {
		const imagePath = makeImagePath('   ', 'resources', 'posts/welcome', 'cover.png');
		expect(imagePath).toEqual(ok('/resources/posts/welcome/cover.png'));
	});

	it('should be a path to an image file located in resources folder starting from a pathname with slashes', () => {
		const imagePath = makeImagePath('   ', 'resources', '/posts/welcome/', 'cover.png');
		expect(imagePath).toEqual(ok('/resources/posts/welcome/cover.png'));
	});

	it('should be a path to default image', () => {
		const imagePath = makeImagePath('   ', 'resources', '/posts/welcome/', '');
		expect(imagePath).toEqual(ok('/images/logos/logo.png'));
	});

	it('should be a path to default image', () => {
		const imagePath = makeImagePath('/', 'resources', '/posts/welcome/', '');
		expect(imagePath).toEqual(ok('/images/logos/logo.png'));
	});

	it('should be an error with "[urls.makeImagePath] Expected string values for all parameters" as message', () => {
		const result = makeImagePath(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[urls.makeImagePath] Expected string values for all parameters'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.makeImagePath] Expected string values for all parameters')
		);
	});
});

describe('parentUrl', () => {
	it('should be https://example.com/blog/posts', () => {
		const want = 'https://example.com/blog/posts';
		const result = parentUrl('https://example.com/blog/posts/welcome');
		expect(result.map((url) => url.href)).toEqual(ok(want));
	});

	it('should be the url itself', () => {
		const want = 'https://example.com/';
		const result = parentUrl('https://example.com/');
		expect(result.map((url) => url.href)).toEqual(ok(want));
	});

	it('should be Error', () => {
		const result = parentUrl('foo/bar');
		expect(result.isErr()).toBe(true);
	});

	it('should be an error with "[urls.parentUrl] Expected a valid URL" as message', () => {
		const result = parentUrl('foo/bar');
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe('[urls.parentUrl] Expected a valid URL');
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.parentUrl] Expected a valid URL')
		);
	});
});

describe('parentPathname', () => {
	it('should be page', () => {
		const want = 'page';
		const result = parentPathname('https://www.example.com/page/subpage');
		expect(result.isOk()).toBe(true);
		expect(result).toEqual(ok(want));
		expect(result._unsafeUnwrap()).toBe(want);
	});

	it('should be page/subpage', () => {
		const want = 'page/subpage';
		const result = parentPathname('https://www.example.com/page/subpage/subsubpage');
		expect(result.isOk()).toBe(true);
		expect(result).toEqual(ok(want));
	});

	it('should be an error with "[urls.parentPathname] Expected a valid URL" as message', () => {
		const result = parentPathname('foo/bar');
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe('[urls.parentPathname] Expected a valid URL');
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[urls.parentPathname] Expected a valid URL')
		);
	});
});

describe('pathSegments', () => {
	it('should return a string array', () => {
		const t = 'https://example.com/blog/welcome';
		const want = ['blog', 'welcome'];
		const result = pathSegments(t);
		expect(result.map((values) => values.length)).toEqual(ok(want.length));
		expect(result._unsafeUnwrap()).toEqual(want);
		expect(result._unsafeUnwrap()[0]).toBe('blog');
	});

	it('should return Expected a valid URL as error message', () => {
		const t = 'example.com/blog/welcome';
		const result = pathSegments(t);
		expect(result._unsafeUnwrapErr().message).toBe('[urls.pathSegments] Expected a valid URL');
	});
});

describe('pathSegments', () => {
	it('should return a string array', () => {});
});
