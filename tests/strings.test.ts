import { describe, it, expect } from 'vitest';
import { Ok, Err } from 'neverthrow';
import {
	capitalize,
	uppercase,
	lowercase,
	capitalizeAll,
	toTitle,
	toSlug,
	removeTrailingSlash,
	textBetween
} from '../src/strings';

describe('capitalize', () => {
	it('should be Welcome', () => {
		const text = 'welcome';

		const result = capitalize(text);
		expect(result).toBe('Welcome');
	});

	it('should be Getting started', () => {
		const text = 'getting started';

		const result = capitalize(text);
		expect(result).toBe('Getting started');
	});
});

describe('uppercase', () => {
	it('should be WELCOME', () => {
		const text = 'welcome';

		const result = uppercase(text);
		expect(result).toBe('WELCOME');
	});

	it('should be GETTING STARTED', () => {
		const text = 'getting started';

		const result = uppercase(text);
		expect(result).toBe('GETTING STARTED');
	});
});

describe('lowercase', () => {
	it('should be welcome', () => {
		const text = 'Welcome';

		const result = lowercase(text);
		expect(result).toBe('welcome');
	});

	it('should be getting started', () => {
		const text = 'GETTING STARTED';

		const result = lowercase(text);
		expect(result).toBe('getting started');
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

	it('should be Getting started', () => {
		const text = 'getting-started';

		const result = toTitle(text, false);
		expect(result).toBe('Getting started');
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

describe('textBetween', () => {
	it('should be "contact"', () => {
		const text = '/contact/';
		const result = textBetween(text, '/', '/');

		expect(result).toBe('contact');
	});

	it('should be "ts/welcom"', () => {
		const text = 'more than happy.';
		const result = textBetween(text, 'more', '.');

		expect(result).toBe('than happy');
	});

	it('should be "posts/welcome"', () => {
		const text = '/posts/welcome/';
		const result = textBetween(text, '/', '/');

		expect(result).toBe('posts/welcome');
	});

	it('should be "(posts)"', () => {
		const text = '(posts)/welcome/';
		const result = textBetween(text, '(', ')');

		expect(result).toBe('posts');
	});

	it('should be "likes and 600"', () => {
		const text = 'I got 500+ likes and 600* or, if you prefer money it is 1000$';
		const result = textBetween(text, '+', '*');

		expect(result).toBe('likes and 600');
	});

	it('should be "if you prefer money it is 1000"', () => {
		const text = 'I got 500+ likes and 600* or, if you prefer money it is 1000$';
		const result = textBetween(text, ',', '$');

		expect(result).toBe('if you prefer money it is 1000');
	});

	it('should be "likes and 600"', () => {
		const text = 'music&playlist?kc|zap';
		let result = textBetween(text, '&', '|');

		expect(result).toBe('playlist?kc');
	});

	it('should be "kc"', () => {
		const text = 'music&playlist?kc|zap';
		const result = textBetween(text, '?', '|');

		expect(result).toBe('kc');
	});

	it('should be "music=zap"', () => {
		const text = '[music=zap]';
		const result = textBetween(text, '[', ']');

		expect(result).toBe('music=zap');
	});

	it('should be "music=zap"', () => {
		const text = '^music=zap.';
		const result = textBetween(text, '^', '.');

		expect(result).toBe('music=zap');
	});
});
