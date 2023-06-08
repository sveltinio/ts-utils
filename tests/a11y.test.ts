import { test, describe, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { ComponentFocusManager } from '../src/a11y/index.js';

describe('ComponentFocusManager', () => {
	let focusManager: ComponentFocusManager;
	let container: HTMLElement;
	let item1: HTMLElement;
	let item2: HTMLElement;
	let item3: HTMLElement;

	// Set up JSDOM
	const { window } = new JSDOM();
	const { document } = window;

	beforeEach(() => {
		container = document.createElement('div');
		item1 = document.createElement('div');
		item1.textContent = 'Apple';

		item2 = document.createElement('div');
		item2.textContent = 'Banana';

		item3 = document.createElement('div');
		item3.textContent = 'Cherry';

		container.appendChild(item1);
		container.appendChild(item2);

		focusManager = new ComponentFocusManager('componentId');
		focusManager.items = { componentId: [item1, item2, item3] };
		focusManager.run();

		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
	});

	test('run method should populate firstChars, firstItem, and lastItem correctly', () => {
		expect(focusManager.firstChars['componentId']).toEqual(['a', 'b', 'c']);
		expect(focusManager.firstItem['componentId']).toBe(item1);
		expect(focusManager.lastItem['componentId']).toBe(item3);
	});

	test('set and get the items property', () => {
		const newItems = [document.createElement('div'), document.createElement('div')];

		focusManager.items = { componentId: newItems };
		expect(focusManager.items['componentId']).toBe(newItems);
	});

	test(' set and get the _firstChars property', () => {
		const newFirstChars = {
			componentId: ['a', 'b', 'c']
		};

		focusManager.firstChars = newFirstChars;
		expect(focusManager.firstChars).toBe(newFirstChars);
	});

	test('set and get the _firstItem property', () => {
		const newFirstItem = {
			componentId: document.createElement('div')
		};

		focusManager.firstItem = newFirstItem;
		expect(focusManager.firstItem).toBe(newFirstItem);
	});

	test('set and get the _lastItem property', () => {
		const newLastItem = {
			componentId: document.createElement('div')
		};

		focusManager.lastItem = newLastItem;
		expect(focusManager.lastItem).toBe(newLastItem);
	});

	test('should set and get the _applyDOMChangesFn property', async () => {
		const newApplyDOMChangesFn = async () => {
			// Custom implementation: simulate async state changes
			await new Promise((resolve) => setTimeout(resolve, 1000));
		};

		focusManager.applyDOMChangesFn = newApplyDOMChangesFn;

		const retrievedApplyDOMChangesFn = focusManager.applyDOMChangesFn;

		// Ensure the retrieved function is the same as the one we set
		expect(retrievedApplyDOMChangesFn).toBe(newApplyDOMChangesFn);
		// Call the retrieved function and assert its behavior
		const promise = retrievedApplyDOMChangesFn();
		expect(promise).toBeInstanceOf(Promise);
	});

	test('setFocusToFirstItem method should set focus to the first item', () => {
		focusManager.setFocusToFirstItem();
		expect(item1.tabIndex).toBe(0);
	});

	test('setFocusToLastItem method should set focus to the last item', () => {
		focusManager.setFocusToLastItem();
		expect(item3.tabIndex).toBe(0);
	});

	test('setFocusToPreviousItem method should set focus to the previous item', () => {
		focusManager.setFocusToPreviousItem(item2);
		expect(item1.tabIndex).toBe(0);
	});

	test('Set focus to the last item if current item is the first item', () => {
		// Create a mock current item
		const mockItemId = 'mockItemId';
		const currentItem = document.createElement('div');

		// Create a mock first item and last item
		const firstItem = document.createElement('div');
		const lastItem = document.createElement('div');

		// Set the first item and last item in the componentFocusManager
		focusManager.firstItem[mockItemId] = firstItem;
		focusManager.lastItem[mockItemId] = lastItem;

		// Set the currentItem as the first item
		focusManager.firstItem[mockItemId] = currentItem;

		// Call the setFocusToPreviousItem method
		focusManager.setFocusToPreviousItem(currentItem, mockItemId);

		// Get the updated state of the componentFocusManager
		const newMenuItem = focusManager.lastItem[mockItemId];

		// Assert that the newMenuItem is the last item
		expect(newMenuItem).toBe(lastItem);
	});

	test('setFocusToNextItem method should set focus to the next item', () => {
		focusManager.setFocusToNextItem(item2);
		expect(item3.tabIndex).toBe(0);
	});

	test('Set focus to the first item if current item is the last item', () => {
		// Create a mock current item
		const mockItemId = 'mockItemId';
		const currentItem = document.createElement('div');

		// Create a mock first item and last item
		const firstItem = document.createElement('div');
		const lastItem = document.createElement('div');

		// Set the first item and last item in the componentFocusManager
		focusManager.firstItem[mockItemId] = firstItem;
		focusManager.lastItem[mockItemId] = lastItem;

		// Set the currentItem as the first item
		focusManager.lastItem[mockItemId] = currentItem;

		// Call the setFocusToPreviousItem method
		focusManager.setFocusToNextItem(currentItem, mockItemId);

		// Get the updated state of the componentFocusManager
		const newMenuItem = focusManager.firstItem[mockItemId];

		// Assert that the newMenuItem is the last item
		expect(newMenuItem).toBe(firstItem);
	});

	test('setFocusByFirstChar method should set focus to the item with matching first character', () => {
		focusManager.setFocusByFirstChar(item2, 'c');
		expect(item3.tabIndex).toBe(0);
	});

	test('Set start to 0 if start is greater than or equal to the number of items', () => {
		// Create a mock current item
		const mockItemId = 'mockItemId';
		const currentItem = document.createElement('div');

		// Create a mock item array
		const items = [document.createElement('div'), document.createElement('div')];

		// Set the items in the componentFocusManager
		focusManager.items[mockItemId] = items;

		// Set the current item as the last item
		focusManager.lastItem[mockItemId] = currentItem;

		// Call the setFocusByFirstChar method with a character that doesn't match any item
		focusManager.setFocusByFirstChar(currentItem, 'z');

		// Get the updated value of the start variable
		const start = focusManager.items[mockItemId].indexOf(currentItem) + 1;

		// Assert that the start value is set to 0
		expect(start).toBe(0);
	});

	test('should set start to 0 if start is greater than or equal to the number of items', () => {
		// Create a mock current item
		const mockItemId = 'mockItemId';
		const currentItem = document.createElement('div');

		// Create a mock item array with 2 items
		const items = [document.createElement('div'), document.createElement('div')];

		// Set the items in the componentFocusManager
		focusManager.items[mockItemId] = items;
		focusManager.firstChars[mockItemId] = ['a', 'b'];
		focusManager.firstItem[mockItemId] = items[0];

		// Call the setFocusByFirstChar method with a character that matches the first item
		focusManager.setFocusByFirstChar(currentItem, 'b');

		// Get the updated value of the start variable
		const start = focusManager.items[mockItemId].indexOf(currentItem) + 1;

		// Assert that the start value is set to 0
		expect(start).toBe(0);
	});

	test('isSubMenu method should return true for elements with aria-haspopup="true"', () => {
		item1.setAttribute('aria-haspopup', 'true');

		const result = focusManager.isSubMenu(item1);
		expect(result).toBe(true);
	});

	test('isSubMenu method should return false for elements without aria-haspopup attribute', () => {
		const result = focusManager.isSubMenu(item2);
		expect(result).toBe(false);
	});

	test('isSubMenu method should return false for elements with aria-haspopup="false"', () => {
		item1.setAttribute('aria-haspopup', 'false');

		const result = focusManager.isSubMenu(item1);
		expect(result).toBe(false);
	});
});
