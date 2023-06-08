import type { BreakpointMatch, Screens } from './types';

/**
 * The ScreenBreakpointChecker class provides methods to check the screen size and breakpoints of a device.
 */
export class ScreenBreakpointChecker {
	private _breakpoints: Screens;
	private _mobileScreenWidth: number;
	private _desktopScreenWidth: number;

	private _defaultBreakpoints: Screens = {
		xs: { min: '320px', max: '639px' },
		sm: { min: '640px', max: '767px' },
		md: { min: '768px', max: '1023px' },
		lg: { min: '1024px', max: '1279px' },
		xl: { min: '1280px', max: '1535px' },
		'2xl': { min: '1536px' }
	};

	/**
	 * Creates an instance of BreakpointChecker.
	 * @param config - Optional. The configuration object for the BreakpointChecker.
	 */
	/**
	 * Creates an instance of BreakpointChecker.
	 * @param screens - Optional. The screen sizes and breakpoints.
	 * @param mobileSize - Optional. The mobile screen size.
	 * @param desktopSize - Optional. The desktop screen size.
	 */
	constructor(screens?: Screens);
	constructor(screens?: Screens, mobileSize?: number, desktopSize?: number) {
		this._breakpoints = screens || this._defaultBreakpoints;

		this._mobileScreenWidth = mobileSize || 768;
		this._desktopScreenWidth = desktopSize || 1024;
	}

	/**
	 * Gets or sets the screen sizes and breakpoints.
	 */
	public get screens(): Screens {
		return this._breakpoints;
	}

	public set screens(value: Screens) {
		this._breakpoints = value;
	}

	/**
	 * Gets or sets the mobile screen size.
	 */
	public get mobileSize(): number {
		return this._mobileScreenWidth;
	}

	public set mobileSize(value: number) {
		this._mobileScreenWidth = value;
	}

	/**
	 * Gets or sets the desktop screen size.
	 */
	public get desktopSize(): number {
		return this._desktopScreenWidth;
	}

	public set desktopSize(value: number) {
		this._desktopScreenWidth = value;
	}

	/**
	 * Checks if the width corresponds to a mobile screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to a mobile screen, false otherwise.
	 */
	public isMobile(width: number): boolean {
		return width < this._mobileScreenWidth;
	}

	/**
	 * Checks if the width corresponds to a tablet screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to a tablet screen, false otherwise.
	 */
	public isTablet(width: number): boolean {
		return width >= this._mobileScreenWidth && width < this._desktopScreenWidth;
	}

	/**
	 * Checks if the width corresponds to a desktop screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to a desktop screen, false otherwise.
	 */
	public isDesktop(width: number): boolean {
		return width >= this._desktopScreenWidth;
	}

	/**
	 * Checks if the width corresponds to a specific breakpoint.
	 * @param width - The width to check.
	 * @param breakpoint - The name of the breakpoint to check.
	 * @returns True if the width corresponds to the specified breakpoint, false otherwise.
	 * @throws Error if an invalid breakpoint name is provided.
	 */
	public isBreakpoint(width: number, breakpoint: BreakpointMatch): boolean {
		const currentBreakpoint = this.screens[breakpoint];

		if (!currentBreakpoint) {
			return false;
		}

		return (
			width >= parseInt(currentBreakpoint.min) &&
			(currentBreakpoint.max === undefined || width <= parseInt(currentBreakpoint.max))
		);
	}

	/**
	 * Checks if the width corresponds to an extra small screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to an extra small screen, false otherwise.
	 */
	public isXSmallScreen(width: number): boolean {
		return this.getBreakpointName(width) === 'xs';
	}

	/**
	 * Checks if the width corresponds to a small screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to a small screen, false otherwise.
	 */
	public isSmallScreen(width: number): boolean {
		return this.getBreakpointName(width) === 'sm';
	}

	/**
	 * Checks if the width corresponds to a medium screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to a medium screen, false otherwise.
	 */
	public isMediumScreen(width: number): boolean {
		return this.getBreakpointName(width) === 'md';
	}

	/**
	 * Checks if the width corresponds to a large screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to a large screen, false otherwise.
	 */
	public isLargeScreen(width: number): boolean {
		return this.getBreakpointName(width) === 'lg';
	}

	/**
	 * Checks if the width corresponds to an extra large screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to an extra large screen, false otherwise.
	 */
	public isXLargeScreen(width: number): boolean {
		return this.getBreakpointName(width) === 'xl';
	}

	/**
	 * Checks if the width corresponds to an extra extra large screen.
	 * @param width - The width to check.
	 * @returns True if the width corresponds to an extra extra large screen, false otherwise.
	 */
	public isXXLargeScreen(width: number): boolean {
		return this.getBreakpointName(width) === '2xl';
	}

	/**
	 * Gets the name of the breakpoint based on the width.
	 * @param width - The width to check.
	 * @returns The name of the corresponding breakpoint.
	 */
	public getBreakpointName(width: number): BreakpointMatch {
		const breakpointKeys = Object.keys(this._breakpoints) as BreakpointMatch[];

		for (let i = breakpointKeys.length - 1; i >= 0; i--) {
			const breakpoint = breakpointKeys[i];
			if (this.isBreakpoint(width, breakpoint)) {
				return breakpoint;
			}
		}

		return breakpointKeys[0];
	}
}
