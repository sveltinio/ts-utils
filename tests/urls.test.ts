import { describe, it, expect } from 'vitest';
import { canonicalURL, makeImagePath, defaultImage } from '../src/urls';

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

	it('should be a path to an image file located in pages folder', () => {
		const imagePath = makeImagePath('   ', 'resources', 'posts/welcome', 'cover.png');
		expect(imagePath).toBe('/resources/posts/welcome/cover.png');
	});
});
