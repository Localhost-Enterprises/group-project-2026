import type { ElementType, ComponentPropsWithoutRef } from 'react';

export const TypographyVariant = {
  /** First-level Heading (default: h1) */
  h1: 'h1',

  /** Second-level Heading (default: h2) */
  h2: 'h2',

  /** Third-level Heading (default: h3) */
  h3: 'h3',

  /** Fourth-level Heading (default: h4) */
  h4: 'h4',

  /** Uppercase text (default: span) */
  uppercase: 'uppercase',

  /** Text for buttons (default: span) */
  button: 'button',

  /** General text (default: p) */
  bodytext: 'bodytext',

  /** Small text (default: span) */
  smalltext: 'smalltext',
} as const;

export type TypographyVariant =
  (typeof TypographyVariant)[keyof typeof TypographyVariant];

/**
 * Typography props
 * @property as - HTML-tag in result
 * @property variant - Typography variant (see figma)
 * @property className - additional classnames
 */
export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: TypographyVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;
