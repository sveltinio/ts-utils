import { isNullish } from '../is/index.js';

/**
 * The `ComponentFocusManager` class provides focus management for components with multiple
 * interactive items. It enables navigation between items, setting focus to specific items, and
 * handling keyboard interactions.
 *
 * Use it to ensure keyboard accessibility as per {@link https://www.w3.org/WAI/ARIA/apg/patterns/ | WAI ARIA Patterns } and improve user experience in menus, dropdowns, and other interactive components.
 */
export class ComponentFocusManager {
	private _id: string;
	private _items: Record<string, HTMLElement[]> = {};
	private _firstChars: Record<string, string[]> = {};
	private _firstItem: Record<string, HTMLElement | null> = {};
	private _lastItem: Record<string, HTMLElement | null> = {};
	private _applyDOMChangesFn: () => Promise<void> = async () => {
		// Default implementation: no pending state changes, resolves immediately
		return Promise.resolve();
	};

	/**
	 * Constructs an instance of ComponentFocusManager.
	 * @param componentId - The ID of the component.
	 */
	constructor(componentId: string) {
		this._id = componentId;
		this._items[componentId] = [];
		this._firstChars[componentId] = [];
		this._firstItem[componentId] = null;
		this._lastItem[componentId] = null;
	}

	/**
	 * Gets or sets the collection of items.
	 */
	public get items(): Record<string, HTMLElement[]> {
		return this._items;
	}
	public set items(value: Record<string, HTMLElement[]>) {
		this._items = value;
	}

	/**
	 * Gets or sets the collection of first characters.
	 */
	public get firstChars(): Record<string, string[]> {
		return this._firstChars;
	}
	public set firstChars(value: Record<string, string[]>) {
		this._firstChars = value;
	}

	/**
	 * Gets or sets the first item in each collection.
	 */
	public get firstItem(): Record<string, HTMLElement | null> {
		return this._firstItem;
	}
	public set firstItem(value: Record<string, HTMLElement | null>) {
		this._firstItem = value;
	}

	/**
	 * Gets or sets the last item in each collection.
	 */
	public get lastItem(): Record<string, HTMLElement | null> {
		return this._lastItem;
	}
	public set lastItem(value: Record<string, HTMLElement | null>) {
		this._lastItem = value;
	}

	/**
	 * Gets or sets the applyDOMChanges promise.
	 */
	public get applyDOMChangesFn(): () => Promise<void> {
		return this._applyDOMChangesFn;
	}

	public set applyDOMChangesFn(value: () => Promise<void>) {
		this._applyDOMChangesFn = value;
	}

	/** methods */

	/**
	 * Runs the focus manager to initialize the collections.
	 */
	public run() {
		this._items[this._id].forEach((item) => {
			// get the first letter of the item
			const menuItemContent = item.textContent?.trim().toLowerCase()[0];
			if (menuItemContent) this._firstChars[this._id].push(menuItemContent);

			if (!this._firstItem[this._id]) {
				this._firstItem[this._id] = item;
			}
			this._lastItem[this._id] = item;
		});
	}

	/**
	 * Sets the focus to the first item.
	 * @param cId - Optional ID of the component. Useful when there are multiple instance of ComponentFocusManeger to reference the right one.
	 */
	public setFocusToFirstItem(cId?: string) {
		const _id = !isNullish(cId) ? cId : this._id;
		this._setFocusToItem(this._firstItem[_id]);
	}

	/**
	 * Sets the focus to the last item.
	 * @param cId - Optional ID of the component. Useful when there are multiple instance of ComponentFocusManeger to reference the right one.
	 */
	public setFocusToLastItem(cId?: string) {
		const _id = !isNullish(cId) ? cId : this._id;
		this._setFocusToItem(this._lastItem[_id]);
	}

	/**
	 * Sets the focus to the previous item relative to the current item.
	 * @param currentItem - The current item.
	 * @param cId - Optional ID of the component. Useful when there are multiple instance of ComponentFocusManeger to reference the right one.
	 * @returns The new focused item.
	 */
	public setFocusToPreviousItem(currentItem: HTMLElement, cId?: string) {
		const _id = !isNullish(cId) ? cId : this._id;
		let newMenuItem, index;

		if (currentItem === this._firstItem[_id]) {
			newMenuItem = this._lastItem[_id];
		} else {
			index = this._items[_id].indexOf(currentItem);
			newMenuItem = this._items[_id][index - 1];
		}

		this._setFocusToItem(newMenuItem);
		return newMenuItem;
	}

	/**
	 * Sets the focus to the next item relative to the current item.
	 * @param currentItem - The current item.
	 * @param cId - Optional ID of the component. Useful when there are multiple instance of ComponentFocusManeger to reference the right one.
	 * @returns The new focused item.
	 */
	public setFocusToNextItem(currentItem: HTMLElement, cId?: string) {
		const _id = !isNullish(cId) ? cId : this._id;
		let newMenuItem, index;

		if (currentItem === this._lastItem[_id]) {
			newMenuItem = this._firstItem[_id];
		} else {
			index = this._items[_id].indexOf(currentItem);
			newMenuItem = this._items[_id][index + 1];
		}

		this._setFocusToItem(newMenuItem);
		return newMenuItem;
	}

	/**
	 * Sets the focus to the item whose content starts with the specified character.
	 * @param currentItem - The current item.
	 * @param c - The character to match.
	 */
	public setFocusByFirstChar(currentItem: HTMLElement, c: string): void {
		let start, index: number;

		if (c.length > 1) return;
		c = c.toLowerCase();
		// Start on position of currentItem
		start = this._items[this._id].indexOf(currentItem) + 1;
		if (start >= this._items[this._id].length) {
			start = 0;
		}
		// Check remaining items
		index = this._firstChars[this._id].indexOf(c, start);
		// If not in remaining, check from beginning
		if (index === -1) {
			index = this._firstChars[this._id].indexOf(c, 0);
		}
		// Found
		if (index > -1) {
			this._setFocusToItem(this._items[this._id][index]);
		}
	}

	/**
	 * Checks if the given node is a submenu (`aria-haspopup` attribute must be `true`).
	 * @param node - The node to check.
	 * @returns A boolean indicating whether the node is a submenu.
	 */
	public isSubMenu(node: HTMLElement): boolean {
		return node.getAttribute('aria-haspopup') === 'true';
	}

	private async _setFocusToItem(item: HTMLElement | null) {
		if (this._items[this._id] && item) {
			await Promise.all(
				this._items[this._id].map(async (itemNode) => {
					if (itemNode === item) {
						itemNode.tabIndex = 0;
						await this.applyDOMChangesFn();
						itemNode.focus();
					} else {
						itemNode.tabIndex = -1;
					}
				})
			);
		}
	}
}
