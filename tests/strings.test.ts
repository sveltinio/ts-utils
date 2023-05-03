import { describe, it, expect } from 'vitest';
import { Ok, ok } from 'neverthrow';
import {
	normalize,
	capitalize,
	uppercase,
	lowercase,
	capitalizeAll,
	toTitle,
	toSlug,
	removeTrailingSlash,
	textBetween,
	toKebabCase,
	toSnakeCase,
	removeFirstOccurrence,
	isCommaSepareted,
	toCommaSepareted,
	toCamelCase,
	toPascalCase,
	camelToKebab,
	camelToSnake
} from '../src/strings/index.js';

describe('normalize', () => {
	it('should be getting started', () => {
		const text = 'getting-started';
		const result = normalize(text);

		expect(result).toEqual(ok('getting started'));
	});

	it('should be bread and butter', () => {
		const text = 'bread_and%butter';
		const result = normalize(text);

		expect(result).toEqual(ok('bread and butter'));
	});

	it('should be an error with "[strings.normalize] Expected string value as input" as message', () => {
		const result = normalize(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.normalize] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.normalize] Expected string value as input')
		);
	});

	it('should use empty string as default value through unwrapOr', () => {
		expect(normalize(10).unwrapOr('')).toBe('');
	});

	it('should return the error string through match', () => {
		const result = normalize(10).match(
			(str) => str,
			(err) => `${err}`
		);
		expect(result).toBe('Error: [strings.normalize] Expected string value as input');
	});
});

describe('uppercase', () => {
	it('should be WELCOME', () => {
		const text = 'welcome';
		const result = uppercase(text);

		expect(result).toEqual(ok('WELCOME'));
	});

	it('should be BREAD AND BUTTER', () => {
		const text = 'bread and butter';
		const result = uppercase(text);

		expect(result).toEqual(ok('BREAD AND BUTTER'));
	});

	it('should be an error with "[strings.uppercase] Expected string value as input" as message', () => {
		const result = uppercase(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.uppercase] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.uppercase] Expected string value as input')
		);
	});
});

describe('lowercase', () => {
	it('should be welcome', () => {
		const text = 'Welcome';
		const result = lowercase(text);

		expect(result).toEqual(ok('welcome'));
	});

	it('should be bread and butter', () => {
		const text = 'BREAD AND BUTTER';
		const result = lowercase(text);

		expect(result).toEqual(ok('bread and butter'));
	});

	it('should be an error with "[strings.lowercase] Expected string value as input" as message', () => {
		const result = lowercase(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.lowercase] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.lowercase] Expected string value as input')
		);
	});
});

describe('capitalize', () => {
	it('should be Welcome', () => {
		const text = 'welcome';
		const result = capitalize(text);

		expect(result).toEqual(ok('Welcome'));
	});

	it('should be Bread and butter', () => {
		const text = 'bread and butter';
		const result = capitalize(text);

		expect(result).toEqual(ok('Bread and butter'));
	});

	it('should be an error with "[strings.capitalize] Expected string value as input" as message', () => {
		const result = capitalize(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.capitalize] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.capitalize] Expected string value as input')
		);
	});
});

describe('capitalizeAll', () => {
	it('should be Welcome', () => {
		const text = 'welcome';
		const result = capitalizeAll(text);

		expect(result).toEqual(ok('Welcome'));
	});

	it('should be Bread And Butter', () => {
		const text = 'bread and butter';
		const result = capitalizeAll(text);

		expect(result).toEqual(ok('Bread And Butter'));
	});

	it('should be an error with "[strings.capitalizeAll] Expected string value as input" as message', () => {
		const result = capitalizeAll(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.capitalizeAll] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.capitalizeAll] Expected string value as input')
		);
	});
});

describe('toTitle', () => {
	it('should be Welcome', () => {
		const text = 'welcome';
		const result = toTitle(text);

		expect(result).toEqual(ok('Welcome'));
	});

	it('should be Bread And Butter', () => {
		const text = 'bread-and-butter';
		const result = toTitle(text);

		expect(result).toEqual(ok('Bread And Butter'));
	});

	it('should be Bread and butter', () => {
		const text = 'bread-and-butter';
		const result = toTitle(text, false);

		expect(result).toEqual(ok('Bread and butter'));
	});

	it('should be an error with "[strings.toTitle] Expected string value as input"', () => {
		const result = toTitle(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.toTitle] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.toTitle] Expected string value as input')
		);
	});
});

describe('toSlug', () => {
	it('should be welcome', () => {
		const text = 'welcome';
		const result = toSlug(text);

		expect(result).toEqual(ok('welcome'));
	});

	it('should be getting-started', () => {
		const text = 'Getting Started';
		const result = toSlug(text);

		expect(result).toEqual(ok('getting-started'));
	});

	it('should be bread-and-butter', () => {
		const text = 'Bread And Butter';
		const result = toSlug(text);

		expect(result).toEqual(ok('bread-and-butter'));
	});

	it('should be an error with "[strings.toSlug] Expected string value as input" as message', () => {
		const result = toSlug(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.toSlug] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.toSlug] Expected string value as input')
		);
	});
});

describe('removeTrailingSlash', () => {
	it('should be http://example.com/contact', () => {
		const text = 'http://example.com/contact/';
		const result = removeTrailingSlash(text);

		expect(result).toEqual(ok('http://example.com/contact'));
	});

	it('should be http://example.com/about', () => {
		const text = 'http://example.com/about';
		const result = removeTrailingSlash(text);

		expect(result).toEqual(ok('http://example.com/about'));
	});

	it('should be an error with "removeTrailingSlash: Expected string value as input" as message', () => {
		const result = removeTrailingSlash(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.removeTrailingSlash] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.removeTrailingSlash] Expected string value as input')
		);
	});
});

describe('textBetween', () => {
	const sample =
		'This is a test string with some characters that need to be escaped in a JavaScript RegExp. The string contains a backslash , a caret ^, a dollar sign $, a period ., a vertical bar |, a question mark ?, an asterisk *, a plus sign +, a opening square bracket [, a closing square bracket ], a couples of /slashes/, an ampersand &, a opening curly brace {, a closing curly brace }, a parenthesis (), a dash -, and some backslashes like \\';

	it('should be "a caret"', () => {
		const result = textBetween(sample, ',', '^');
		expect(result).toEqual(ok('a caret'));
	});

	it('should be ", a question mark"', () => {
		const result = textBetween(sample, '|', '?');
		expect(result).toEqual(ok(', a question mark'));
	});

	it('should be ", a period ., a vertical bar"', () => {
		const result = textBetween(sample, '$', '|');
		expect(result).toEqual(ok(', a period ., a vertical bar'));
	});

	it('should be ", a period"', () => {
		const result = textBetween(sample, '$', '.');
		expect(result).toEqual(ok(', a period'));
	});

	it('should be ", a dash"', () => {
		const result = textBetween(sample, ')', '-');
		expect(result).toEqual(ok(', a dash'));
	});

	it('should be "like"', () => {
		const result = textBetween(sample, 'backslashes', '\\');
		expect(result).toEqual(ok('like'));
	});

	it('should be "posts/welcome"', () => {
		const result = textBetween(sample, '/', '/');
		expect(result).toEqual(ok('slashes'));
	});

	it('should be "posts"', () => {
		const result = textBetween(sample, '(', ')');
		expect(result).toEqual(ok(''));
	});

	it('should be ", a opening curly brace"', () => {
		let result = textBetween(sample, '&', '{');
		expect(result).toEqual(ok(', a opening curly brace'));
	});

	it('should be ", an asterisk"', () => {
		const result = textBetween(sample, '?', '*');
		expect(result).toEqual(ok(', an asterisk'));
	});

	it('should be ", a opening square bracket"', () => {
		const result = textBetween(sample, '+', '[');
		expect(result).toEqual(ok(', a opening square bracket'));
	});

	it('should be ", a closing square bracket"', () => {
		const result = textBetween(sample, '[', ']');
		expect(result).toEqual(ok(', a closing square bracket'));
	});

	it('should be ", a closing curly brace"', () => {
		const result = textBetween(sample, '{', '}');
		expect(result).toEqual(ok(', a closing curly brace'));
	});

	it('should be an error with "[strings.textBetween] Expected string value as input" as message', () => {
		const result = textBetween(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.textBetween] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.textBetween] Expected string value as input')
		);
	});
});

describe('toSnakeCase', () => {
	it('should convert a single word to snake_case', () => {
		const result = toSnakeCase('hello');

		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('hello');
	});

	it('should convert a sentence to snake_case', () => {
		const result = toSnakeCase('Hello world!');

		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('hello_world');
	});

	it('should return Err for an invalid input type', () => {
		const result = toSnakeCase(123);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.toSnakeCase] Expected string value as input'
		);
	});
});

describe('toKebabCase', () => {
	it('should return Ok for a valid input string', () => {
		const result = toKebabCase('hello world');

		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('hello-world');
	});

	it('should return Err for an invalid input type', () => {
		const result = toKebabCase(123);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.toKebabCase] Expected string value as input'
		);
	});

	it('should handle multiple spaces and leading/trailing spaces', () => {
		const result = toKebabCase('hello   world ');

		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('hello-world');
	});
});

describe('toCamelCase', () => {
	it('should convert space-separated words to camelCase', () => {
		const result = toCamelCase('hello world');
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('helloWorld');
	});

	it('should convert kebab-case words to camelCase', () => {
		const result = toCamelCase('foo-bar-baz');
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('fooBarBaz');
	});

	it('should return an error if input is not a string', () => {
		const result = toCamelCase(123);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.toCamelCase] Expected string value as input'
		);
	});
});

describe('toPascalCase', () => {
	it('converts a string with spaces to PascalCase', () => {
		const input = 'hello world';
		const result = toPascalCase(input);
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('HelloWorld');
	});

	it('converts a string with hyphens to PascalCase', () => {
		const input = 'foo-bar-baz';
		const result = toPascalCase(input);
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe('FooBarBaz');
	});

	it('returns an error for non-string input', () => {
		const input = 42;
		const result = toPascalCase(input);
		expect(result.isOk()).toBe(false);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr()).toMatchObject({
			message: '[strings.toPascalCase] Expected string value as input'
		});
	});
});
describe('camelToSnake', () => {
	it('converts a camelCase string to snake_case', () => {
		const input = 'helloWorld';
		const expectedOutput = 'hello_world';
		const result = camelToSnake(input);
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(expectedOutput);
	});

	it('returns an error when given a non-string input', () => {
		const input = 42;
		const result = camelToSnake(input);
		expect(result.isOk()).toBe(false);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.camelToSnake] Expected string value as input'
		);
	});
});

describe('camelToKebab', () => {
	it('converts a camelCase string to kebab-case', () => {
		const input = 'helloWorld';
		const expectedOutput = 'hello-world';
		const result = camelToKebab(input);
		expect(result.isOk()).toBe(true);
		expect(result._unsafeUnwrap()).toBe(expectedOutput);
	});

	it('returns an error when given a non-string input', () => {
		const input = 42;
		const result = camelToKebab(input);
		expect(result.isOk()).toBe(false);
		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.camelToKebab] Expected string value as input'
		);
	});
});

describe('isCommaSeparated', () => {
	it('should be a valid comma separted list', async () => {
		expect(isCommaSepareted('one,')).toEqual(true);
		expect(isCommaSepareted('one, two')).toEqual(true);
		expect(isCommaSepareted('one, two, three')).toEqual(true);
	});

	it('should be a invalid comma separted list', async () => {
		expect(isCommaSepareted('one')).toEqual(false);
		expect(isCommaSepareted('one two three')).toEqual(false);
	});
});

describe('toCommaSeparated', () => {
	it('should be a valid comma separted list', async () => {
		expect(toCommaSepareted('one two')).toEqual(ok('one,two'));
		expect(toCommaSepareted('one;two')).toEqual(ok('one,two'));
		expect(toCommaSepareted('one-two')).toEqual(ok('one,two'));
		expect(toCommaSepareted('one_two')).toEqual(ok('one,two'));
	});

	it('should be an error with "[strings.toCommaSepareted] Expected string value as input" as message', () => {
		const result = toCommaSepareted(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.toCommaSeparated] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.toCommaSeparated] Expected string value as input')
		);
	});
});

describe('removeFirstOccurrence', () => {
	it('should always return valid result', async () => {
		expect(removeFirstOccurrence('Hello World', 'lo')._unsafeUnwrap()).toBe('Hel World');

		expect(removeFirstOccurrence('  Foo Bar  ', 'Bar', false)._unsafeUnwrap()).toBe('  Foo   ');

		expect(removeFirstOccurrence('Hello World', 'xyz')._unsafeUnwrap()).toBe('Hello World');

		expect(removeFirstOccurrence('Hello World', 'lo', false)._unsafeUnwrap()).toBe('Hel World');
	});

	it('should return error', () => {
		expect(removeFirstOccurrence(null, 'lo').isErr()).toBe(true);

		expect(removeFirstOccurrence('Hello World', null).isErr()).toBe(true);
	});

	it('should be an error with "[strings.removeFirstOccurrence] Expected string value as input" as message', () => {
		const result = removeFirstOccurrence(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[strings.removeFirstOccurrence] Expected string value as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[strings.removeFirstOccurrence] Expected string value as input')
		);
	});
});
