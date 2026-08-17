/**
 * Sourcing catalog — 17 categories.
 * These are SOURCING CATEGORIES (capabilities), not current inventory.
 * Names/descriptions/positioning come from the i18n dictionary per language.
 */

export const CATEGORY_IDS = [
  'olive-oil',
  'dates',
  'coffee',
  'tea',
  'spices',
  'nuts',
  'dried-fruits',
  'grains',
  'legumes',
  'pasta',
  'canned-foods',
  'honey',
  'sauces',
  'dairy',
  'frozen-foods',
  'seafood',
  'confectionery',
] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export const CATEGORY_COUNT = CATEGORY_IDS.length

/** Per-category visual identity: monogram, accent tone and country/region hint. */
export const CATEGORY_META: Record<
  CategoryId,
  { mono: string; origin: string; tone: 'elec' | 'crimson' }
> = {
  'olive-oil': { mono: 'OO', origin: 'MED', tone: 'elec' },
  dates: { mono: 'DA', origin: 'DZ', tone: 'crimson' },
  coffee: { mono: 'CF', origin: 'BR', tone: 'elec' },
  tea: { mono: 'TE', origin: 'CN', tone: 'crimson' },
  spices: { mono: 'SP', origin: 'IN', tone: 'elec' },
  nuts: { mono: 'NT', origin: 'US', tone: 'crimson' },
  'dried-fruits': { mono: 'DF', origin: 'TR', tone: 'elec' },
  grains: { mono: 'GR', origin: 'FR', tone: 'crimson' },
  legumes: { mono: 'LG', origin: 'TR', tone: 'elec' },
  pasta: { mono: 'PA', origin: 'IT', tone: 'crimson' },
  'canned-foods': { mono: 'CN', origin: 'TH', tone: 'elec' },
  honey: { mono: 'HN', origin: 'DZ', tone: 'crimson' },
  sauces: { mono: 'SC', origin: 'JP', tone: 'elec' },
  dairy: { mono: 'DR', origin: 'NL', tone: 'crimson' },
  'frozen-foods': { mono: 'FZ', origin: 'VN', tone: 'elec' },
  seafood: { mono: 'SF', origin: 'NO', tone: 'crimson' },
  confectionery: { mono: 'CO', origin: 'BE', tone: 'elec' },
}