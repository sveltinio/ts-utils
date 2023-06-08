import { isNullish } from '../is';
import { Result, ok, err } from 'neverthrow';

/**
 * The CSSHelper class is a utility class that provides convenient methods for manipulating CSS
 * classes on HTML elements. It allows you to perform common tasks such as checking if an element
 * has a specific CSS class, adding or removing CSS classes, toggling classes, and bulk operations
 * for adding or removing multiple classes.
 */
export class CSSHelper {
	/**
	 * Checks if an HTML element has a specific CSS class.
	 *
	 * @param element - The HTML element to check.
	 * @param className - The name of the CSS class to check for.
	 * @returns A Result containing a boolean indicating whether the element has the specified class.
	 *
	 * @example
	 * ```typescript
	 * const element = document.querySelector('.my-element');
	 * const hasClass = CSSHelper.hasClass(element, 'active');
	 * // => true
	 * ```
	 */
	static hasClass(element: HTMLElement | null, className: string): Result<boolean, Error> {
		if (!isNullish(element)) {
			return ok(element.classList.contains(className));
		}
		return err(new Error('Invalid element provided.'));
	}

	/**
	 * Adds a CSS class to an HTML element.
	 *
	 * @param element - The HTML element to which the CSS class will be added.
	 * @param className - The name of the CSS class to add.
	 * @returns A Result indicating success or an error if the element is invalid.
	 *
	 * @example
	 * ```typescript
	 * const element = document.querySelector('.my-element');
	 * CSSHelper.addClass(element, 'active');
	 * ```
	 */
	static addClass(element: HTMLElement | null, className: string): Result<null, Error> {
		if (!isNullish(element)) {
			element.classList.add(className);
			return ok(null);
		}
		return err(new Error('Invalid element provided.'));
	}

	/**
	 * Removes a specified CSS class from a given HTML element.
	 *
	 * @param element - The HTML element from which the CSS class will be removed.
	 * @param className - The name of the CSS class to remove.
	 * @returns A Result indicating success or an error if the element is invalid.
	 *
	 * @example
	 * ```typescript
	 * const element = document.querySelector('.my-element');
	 * CSSHelper.removeClass(element, 'active');
	 * ```
	 */
	static removeClass(element: HTMLElement | null, className: string): Result<null, Error> {
		if (!isNullish(element)) {
			element.classList.remove(className);
			return ok(null);
		}
		return err(new Error('Invalid element provided.'));
	}

	/**
	 * Toggles a CSS class on an HTML element.
	 *
	 * @param element - The HTML element on which to toggle the CSS class.
	 * @param className - The name of the CSS class to toggle.
	 * @returns A Result indicating success or an error if the element is invalid.
	 *
	 * @example
	 * ```typescript
	 * const element = document.querySelector('.my-element');
	 * CSSHelper.toggleClass(element, 'active');
	 * ```
	 */
	static toggleClass(element: HTMLElement | null, className: string): Result<null, Error> {
		if (!isNullish(element)) {
			element.classList.toggle(className);
			return ok(null);
		}
		return err(new Error('Invalid element provided.'));
	}

	/**
	 * Adds specified CSS classes to a given HTML element.
	 *
	 * @param element - The HTML element to which the CSS classes will be added.
	 * @param classes - An array of CSS class names to add.
	 * @returns A Result indicating success or an error if the element is invalid.
	 *
	 * @example
	 * ```typescript
	 * const element = document.querySelector('.my-element');
	 * const classesToAdd = ['active', 'highlighted'];
	 * CSSHelper.addClasses(element, classesToAdd);
	 * ```
	 */
	static addClasses(element: HTMLElement | null, classes: string[]): Result<null, Error> {
		if (!isNullish(element)) {
			for (const className of classes) {
				element.classList.add(className);
			}
			return ok(null);
		}
		return err(new Error('Invalid element provided.'));
	}

	/**
	 * Removes specified CSS classes from a given HTML element.
	 *
	 * @param element - The HTML element from which the CSS classes will be removed.
	 * @param classes - An array of CSS class names to remove.
	 * @returns A Result indicating success or an error if the element is invalid.
	 *
	 * @example
	 * ```typescript
	 * const element = document.querySelector('.my-element');
	 * const classesToRemove = ['active', 'highlighted'];
	 * CSSHelper.removeClasses(element, classesToRemove);
	 * ```
	 */
	static removeClasses(element: HTMLElement | null, classes: string[]): Result<null, Error> {
		if (!isNullish(element)) {
			for (const className of classes) {
				element.classList.remove(className);
			}
			return ok(null);
		}
		return err(new Error('Invalid element provided.'));
	}
}
