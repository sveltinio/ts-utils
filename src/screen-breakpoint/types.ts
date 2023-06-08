export type BreakpointMatch = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Screens = Partial<Record<BreakpointMatch, { min: string; max?: string }>>;
