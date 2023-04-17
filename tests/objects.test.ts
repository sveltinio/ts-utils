import { describe, it, expect } from 'vitest';
import { checkPropValue, checkRequiredProp, stylesObjToCSSVars } from '../src/objects';

describe('checkPropValue', () => {
	it('should be true', () => {
		const obj = { label: 'welcome', href: 'https://example.com' };
		expect(checkPropValue(obj, 'label', 'welcome')).toBe(true);
	});

	it('should be false', () => {
		const obj = { label: 'welcome', href: 'https://example.org' };
		expect(checkPropValue(obj, 'href', 'welcome')).toBe(false);
	});
});

describe('checkRequiredProp', () => {
	it('should be true', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { label: 'welcome', href: 'https://example.com' };
		expect(checkRequiredProp(obj, mandatoryKeys)).toBe(true);
	});

	it('should be false', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { href: 'https://example.com' };
		expect(checkRequiredProp(obj, mandatoryKeys)).toBe(false);
	});

	it('should be false', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { label: '', href: 'https://example.com' };
		expect(checkRequiredProp(obj, mandatoryKeys)).toBe(false);
	});

	it('should be false', () => {
		const mandatoryKeys = ['label', 'href'];
		const obj = { label: 'welcome', href: 'undefined' };
		expect(checkRequiredProp(obj, mandatoryKeys)).toBe(false);
	});
});

describe('stylesObjToCSSVars', () => {
	it('should be false', () => {
		const styles = {
			pt: '1rem',
			'btn-border': '1px'
		};

		const want = '--pt: 1rem; --btn-border: 1px;';
		expect(stylesObjToCSSVars(styles)).toBe(want);
	});
});
