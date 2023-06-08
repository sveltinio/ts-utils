import { describe, expect, beforeEach } from 'vitest';
import type { Screens } from '../src/screen-breakpoint';
import { ScreenBreakpointChecker } from '../src/screen-breakpoint';

describe('ScreenBreakpointChecker', (test) => {
	let breakpointChecker: ScreenBreakpointChecker;

	beforeEach(() => {
		breakpointChecker = new ScreenBreakpointChecker();
	});

	test('screens getter and setter', () => {
		const screens: Screens = {
			xs: { min: '320px', max: '639px' },
			sm: { min: '640px', max: '767px' },
			md: { min: '768px', max: '1023px' },
			lg: { min: '1024px', max: '1279px' },
			xl: { min: '1280px', max: '1535px' },
			'2xl': { min: '1536px' }
		};
		breakpointChecker.screens = screens;
		expect(breakpointChecker.screens).toEqual(screens);
	});

	test('mobileSize getter and setter', () => {
		const mobileSize = 500;

		breakpointChecker.mobileSize = mobileSize;
		expect(breakpointChecker.mobileSize).toBe(mobileSize);
	});

	test('desktopSize getter and setter', () => {
		const desktopSize = 1200;

		breakpointChecker.desktopSize = desktopSize;
		expect(breakpointChecker.desktopSize).toBe(desktopSize);
	});

	test('isMobile', () => {
		expect(breakpointChecker.isMobile(320)).toBe(true);
		expect(breakpointChecker.isMobile(500)).toBe(true);
		expect(breakpointChecker.isMobile(768)).toBe(false);
		expect(breakpointChecker.isMobile(1024)).toBe(false);
	});

	test('isDesktop', () => {
		expect(breakpointChecker.isDesktop(320)).toBe(false);
		expect(breakpointChecker.isDesktop(500)).toBe(false);
		expect(breakpointChecker.isDesktop(768)).toBe(false);
		expect(breakpointChecker.isDesktop(1024)).toBe(true);
		expect(breakpointChecker.isDesktop(1600)).toBe(true);
	});

	test('isTablet', () => {
		expect(breakpointChecker.isTablet(320)).toBe(false);
		expect(breakpointChecker.isTablet(500)).toBe(false);
		expect(breakpointChecker.isTablet(768)).toBe(true);
		expect(breakpointChecker.isTablet(1024)).toBe(false);
		expect(breakpointChecker.isTablet(1600)).toBe(false);
	});

	test('isBreakpoint', () => {
		expect(breakpointChecker.isBreakpoint(500, 'xs')).toBe(true);
		expect(breakpointChecker.isBreakpoint(800, 'sm')).toBe(false);
		expect(breakpointChecker.isBreakpoint(1200, 'md')).toBe(false);
		expect(breakpointChecker.isBreakpoint(1400, 'lg')).toBe(false);
		expect(breakpointChecker.isBreakpoint(1500, 'xl')).toBe(true);
		expect(breakpointChecker.isBreakpoint(1800, '2xl')).toBe(true);
		expect(breakpointChecker.isBreakpoint(500, 'sm')).toBe(false);
		expect(breakpointChecker.isBreakpoint(800, 'md')).toBe(true);
		expect(breakpointChecker.isBreakpoint(1200, 'xl')).toBe(false);
		expect(breakpointChecker.isBreakpoint(1400, '2xl')).toBe(false);
	});

	test('isBreakpoint - returns false for invalid breakpoint', () => {
		// Adding breakpoint to screens
		breakpointChecker.screens = {
			xs: { min: '0', max: '599' },
			sm: { min: '600', max: '959' }
		};

		// Valid breakpoints
		expect(breakpointChecker.isBreakpoint(500, 'xs')).toBe(true);
		expect(breakpointChecker.isBreakpoint(800, 'sm')).toBe(true);

		// Invalid breakpoint
		expect(breakpointChecker.isBreakpoint(500, 'invalid')).toBe(false);
	});

	test('isXSmallScreen', () => {
		expect(breakpointChecker.isXSmallScreen(500)).toBe(true);
		expect(breakpointChecker.isXSmallScreen(800)).toBe(false);
	});

	test('isSmallScreen', () => {
		expect(breakpointChecker.isSmallScreen(500)).toBe(false);
		expect(breakpointChecker.isSmallScreen(700)).toBe(true);
	});

	test('isMediumScreen', () => {
		expect(breakpointChecker.isMediumScreen(800)).toBe(true);
		expect(breakpointChecker.isMediumScreen(1100)).toBe(false);
	});

	test('isLargeScreen', () => {
		expect(breakpointChecker.isLargeScreen(1000)).toBe(false);
		expect(breakpointChecker.isLargeScreen(1200)).toBe(true);
	});

	test('isXLargeScreen', () => {
		expect(breakpointChecker.isXLargeScreen(1200)).toBe(false);
		expect(breakpointChecker.isXLargeScreen(1400)).toBe(true);
	});

	test('isXXLargeScreen', () => {
		expect(breakpointChecker.isXXLargeScreen(1400)).toBe(false);
		expect(breakpointChecker.isXXLargeScreen(1600)).toBe(true);
	});

	test('isXSmallScreen - returns true if width corresponds to an extra small screen', () => {
		// Custom breakpoint configuration
		const customScreens = {
			xs: { min: '320px', max: '639px' },
			sm: { min: '640px', max: '767px' }
		};

		breakpointChecker.screens = customScreens;

		test('isXSmallScreen - returns true if width corresponds to an extra small screen', () => {
			// Extra small screen width
			expect(breakpointChecker.isXSmallScreen(300)).toBe(true);
			expect(breakpointChecker.isXSmallScreen(500)).toBe(true);
			expect(breakpointChecker.isXSmallScreen(599)).toBe(true);

			// Non-extra small screen width
			expect(breakpointChecker.isXSmallScreen(700)).toBe(false);
			expect(breakpointChecker.isXSmallScreen(800)).toBe(false);
		});
	});

	test('isXSmallScreen - uses the latest matching breakpoint', () => {
		// Custom breakpoint configuration
		const customScreens = {
			xs: { min: '320px', max: '639px' },
			md: { min: '640px', max: '1023px' }
		};

		breakpointChecker.screens = customScreens;

		// The width corresponds to both xs and md breakpoints,
		// but the latest breakpoint is md, so it should return true
		expect(breakpointChecker.isXSmallScreen(500)).toBe(true);
	});

	test('getBreakpointName - returns the latest matching breakpoint', () => {
		breakpointChecker.screens = {
			xs: { min: '0', max: '500' },
			sm: { min: '600', max: '959' },
			md: { min: '960', max: '1279' }
		};

		// Non-matching width
		expect(breakpointChecker.getBreakpointName(550)).toBe('xs');

		// Non-matching width
		expect(breakpointChecker.getBreakpointName(2000)).toBe('xs');
	});
});
