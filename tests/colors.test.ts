import { describe, it, expect } from 'vitest';
import { ok } from 'neverthrow';
import { isHex, getHexValue, randomHexColor } from '../src/colors/index.js';

describe('isHex', () => {
	it('should be a valid hex color', async () => {
		expect(isHex('#ff0000')).toEqual(true);
		expect(isHex('#fff')).toEqual(true);
	});

	it('should be an invalid hex color', async () => {
		expect(isHex('ff0000')).toEqual(false);
	});
});

describe('getHexValue', () => {
	it('should give me back the hex string from a valid hex color string', async () => {
		const hex = getHexValue('#ff0000');
		expect(hex).toEqual(ok('ff0000'));
	});

	it('should be an error with "[colors.getHexValue] Expected valid hex string as input" when invalid hex value as input', async () => {
		const hex = getHexValue('#GHIJKL');

		expect(hex.isErr()).toBe(true);
		expect(hex._unsafeUnwrapErr().message).toBe(
			'[colors.getHexValue] Expected valid hex string as input'
		);
	});

	it('should be an error with "[colors.getHexValue] Expected valid hex string as input" as message when no string as input', () => {
		const result = getHexValue(10);

		expect(result.isErr()).toBe(true);
		expect(result._unsafeUnwrapErr().message).toBe(
			'[colors.getHexValue] Expected valid hex string as input'
		);
		expect(result._unsafeUnwrapErr()).toStrictEqual(
			new Error('[colors.getHexValue] Expected valid hex string as input')
		);
	});
});

describe('randomHexColor', () => {
	it('should be a valid hex color', () => {
		const color = randomHexColor();
		expect(color.length).toBe(7);
		expect(isHex(color)).toEqual(true);
	});
});
