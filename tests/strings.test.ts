import { describe, it, expect } from 'vitest';
import {
	capitalizeFirstLetter,
	capitalizeAll,
	toTitle,
	toSlug,
	removeTrailingSlash
} from '../src/strings';

describe('capitalizeFirstLetter', () => {
	it('should be Welcome', () => {
		const text = 'welcome';

		const result = capitalizeFirstLetter(text);
		expect(result).toBe('Welcome');
	});

	it('should be Getting started', () => {
		const text = 'getting started';

		const result = capitalizeFirstLetter(text);
		expect(result).toBe('Getting started');
	});
});

describe('capitalizeAll', () => {
	it('should be Welcome', () => {
		const text = 'welcome';

		const result = capitalizeAll(text);
		expect(result).toBe('Welcome');
	});

	it('should be Getting Started', () => {
		const text = 'getting started';

		const result = capitalizeAll(text);
		expect(result).toBe('Getting Started');
	});
});

describe('toTitle', () => {
	it('should be Welcome', () => {
		const text = 'welcome';

		const result = toTitle(text);
		expect(result).toBe('Welcome');
	});

	it('should be Getting Started', () => {
		const text = 'getting-started';

		const result = toTitle(text);
		expect(result).toBe('Getting Started');
	});
});

describe('toSlug', () => {
	it('should be welcome', () => {
		const text = 'welcome';

		const result = toSlug(text);
		expect(result).toBe('welcome');
	});

	it('should be getting-started', () => {
		const text = 'Getting Started';

		const result = toSlug(text);
		expect(result).toBe('getting-started');
	});

	it('should be my-first-topic', () => {
		const text = 'My First Topic';

		const result = toSlug(text);
		expect(result).toBe('my-first-topic');
	});
});

describe('removeTrailingSlash', () => {
	it('should be http://example.com/contact', () => {
		const text = 'http://example.com/contact/';

		const result = removeTrailingSlash(text);
		expect(result).toBe('http://example.com/contact');
	});

	it('should be http://example.com/about', () => {
		const text = 'http://example.com/about';

		const result = removeTrailingSlash(text);
		expect(result).toBe('http://example.com/about');
	});
});
