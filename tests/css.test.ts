import { CSSHelper } from '../src/css/index.js';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { ok, err } from 'neverthrow';

describe('CSSHelper', () => {
	const { window } = new JSDOM();
	const { document } = window;
	const element = document.createElement('div');

	it('should check if an element has a CSS class', () => {
		element.classList.add('class1', 'class2', 'class3');

		expect(CSSHelper.hasClass(element, 'class1')).toStrictEqual(ok(true));
		expect(CSSHelper.hasClass(element, 'class2')).toStrictEqual(ok(true));
		expect(CSSHelper.hasClass(element, 'class3')).toStrictEqual(ok(true));
		expect(CSSHelper.hasClass(element, 'class4')).toStrictEqual(ok(false));
	});

	it('should add a CSS class to an element', () => {
		CSSHelper.addClass(element, 'class4');
		expect(element.classList.contains('class4')).toEqual(true);
	});

	it('should remove a CSS class from an element', () => {
		CSSHelper.removeClass(element, 'class4');
		expect(element.classList.contains('class4')).toEqual(false);
	});

	it('should toggle a CSS class on an element', () => {
		CSSHelper.toggleClass(element, 'class4');
		expect(element.classList.contains('class4')).toEqual(true);

		CSSHelper.toggleClass(element, 'class4');
		expect(element.classList.contains('class4')).toEqual(false);
	});

	it('should add multiple CSS classes to an element', () => {
		const classesToAdd = ['class5', 'class6', 'class7'];

		CSSHelper.addClasses(element, classesToAdd);
		classesToAdd.forEach((className) => {
			expect(element.classList.contains(className)).toEqual(true);
		});
	});

	it('should remove multiple CSS classes from an element', () => {
		const classesToRemove = ['class5', 'class6', 'class7'];

		CSSHelper.removeClasses(element, classesToRemove);
		classesToRemove.forEach((className) => {
			expect(element.classList.contains(className)).toEqual(false);
		});
	});

	it('should handle invalid element in hasClass method', () => {
		const invalidElement: HTMLElement | null = null;
		expect(CSSHelper.hasClass(invalidElement, 'class1')).toStrictEqual(
			err(new Error('Invalid element provided.'))
		);
	});

	it('should handle invalid element in addClass method', () => {
		const invalidElement: HTMLElement | null = null;
		expect(CSSHelper.addClass(invalidElement, 'class1')).toStrictEqual(
			err(new Error('Invalid element provided.'))
		);
	});

	it('should handle invalid element in removeClass method', () => {
		const invalidElement: HTMLElement | null = null;
		expect(CSSHelper.removeClass(invalidElement, 'class1')).toStrictEqual(
			err(new Error('Invalid element provided.'))
		);
	});

	it('should handle invalid element in toggleClass method', () => {
		const invalidElement: HTMLElement | null = null;
		expect(CSSHelper.toggleClass(invalidElement, 'class1')).toStrictEqual(
			err(new Error('Invalid element provided.'))
		);
	});

	it('should handle invalid element in addClasses method', () => {
		const invalidElement: HTMLElement | null = null;
		const classesToAdd = ['class1', 'class2'];
		expect(CSSHelper.addClasses(invalidElement, classesToAdd)).toStrictEqual(
			err(new Error('Invalid element provided.'))
		);
	});

	it('should handle invalid element in removeClasses method', () => {
		const invalidElement: HTMLElement | null = null;
		const classesToRemove = ['class1', 'class2'];
		expect(CSSHelper.removeClasses(invalidElement, classesToRemove)).toStrictEqual(
			err(new Error('Invalid element provided.'))
		);
	});
});
