/**
 * Single source for category/material labels used on the PLP (?category= ?material=),
 * admin forms, and home page grids.
 */

export type CategoryCard = {
  name: string;
  image: string;
  description: string;
};

export type MaterialCollection = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

/**
 * Canonical product category strings (stored on `product.category`, PLP ?category=).
 * Admin radios and home tiles derive from these so labels stay consistent everywhere.
 */
export const ADMIN_CATEGORY_VALUES = [
  "Plates",
  "Bowls",
  "Cups & Mugs",
  "Platters",
  "Dinner set",
  "Gift pack",
] as const;

export type CategoryName = (typeof ADMIN_CATEGORY_VALUES)[number];

function categorySlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORY_SLUG_TO_LABEL: Record<string, CategoryName> = Object.fromEntries(
  ADMIN_CATEGORY_VALUES.map((label) => [categorySlug(label), label])
) as Record<string, CategoryName>;

/**
 * If `product.category` was saved as a slug (e.g. gift-pack), map to the label
 * used in selects and `<option value>`.
 */
export function canonicalCategoryForAdmin(stored: string): string {
  const t = stored.trim();
  if (!t) return t;
  const slug = categorySlug(t);
  // Back-compat: some older admin UIs accidentally saved display labels like
  // "Dinner set (material slug: dinner-set)". Treat those as canonical.
  if (slug.includes("dinner-set")) return "Dinner set";
  if (slug.includes("gift-pack")) return "Gift pack";
  return CATEGORY_SLUG_TO_LABEL[slug] ?? t;
}

/** PLP/listing category filter accepts canonical name or common slug typo. */
export function categoriesMatch(
  queryCategory: string,
  productCategory: string
): boolean {
  // Compare by slug so case/punctuation/extra spaces never break category matches.
  return (
    categorySlug(canonicalCategoryForAdmin(queryCategory)) ===
    categorySlug(canonicalCategoryForAdmin(productCategory))
  );
}

const CATEGORY_CARD_DETAILS: Record<
  CategoryName,
  { image: string; description: string }
> = {
  Plates: {
    image: "/categories/plates.png",
    description: "Dinner plates, quarter plates, pasta plates",
  },
  Bowls: {
    image: "/categories/bowls.png",
    description: "Soup bowls, serving bowls, dessert bowls",
  },
  "Cups & Mugs": {
    image: "/categories/cups.png",
    description: "Coffee cups, tea mugs, hotel cups",
  },
  Platters: {
    image: "/categories/platters.png",
    description: "Serving platters for presentation",
  },
  "Dinner set": {
    image: "/categories/dinner-set.png",
    description:
      "Coordinated plate, bowl & serveware sets for full table styling",
  },
  "Gift pack": {
    image: "/categories/gift-pack.png",
    description:
      "Premium boxed and ribboned sets—ideal for retail, gifting, and turnkey table stories.",
  },
};

/** Home category tiles → `/products?category=<name>` */
export const CATEGORY_CARDS: CategoryCard[] = ADMIN_CATEGORY_VALUES.map(
  (name) => ({
    name,
    ...CATEGORY_CARD_DETAILS[name],
  })
);

/** Explore collections → `/products?material=<slug>` */
export const MATERIAL_COLLECTIONS: MaterialCollection[] = [
  {
    name: "Sprinkle Glow",
    slug: "sprinkle",
    image: "/collections/sprinkle.png",
    description:
      "Textured finish that adds depth and creativity to plating without overpowering the dish.",
  },
  {
    name: "Plain Matte",
    slug: "matte",
    image: "/collections/matte.png",
    description:
      "Understated matte surface that keeps focus on food while offering long-lasting durability.",
  },
  {
    name: "50-50 Blend",
    slug: "blend",
    image: "/collections/blend.png",
    description:
      "A balanced fusion of textures that creates a modern and distinctive visual identity.",
  },
  {
    name: "White Glow",
    slug: "white",
    image: "/collections/white.png",
    description:
      "Clean, bright finish that enhances food presentation with timeless appeal.",
  },
  {
    name: "Gift pack",
    slug: "gift-pack",
    image: "/collections/gift-pack.png",
    description:
      "Bundled plates, bowls & serveware in coordinated finishes—ideal for gifting and turnkey sets.",
  },
  {
    name: "Serene",
    slug: "serene",
    image: "/collections/serene.png",
    description:
      "Soft tones designed to create a calm and sophisticated dining experience.",
  },
  {
    name: "Designer",
    slug: "designer",
    image: "/collections/designer.png",
    description:
      "Bold and expressive designs crafted for unique and standout presentations.",
  },
  {
    name: "Dinner set",
    slug: "dinner-set",
    image: "/collections/dinner-set.png",
    description:
      "Matched sets and harmonious finishes ideal for turnkey table presentation.",
  },
  {
    name: "Pillar Outer",
    slug: "linear",
    image: "/collections/linear.png",
    description:
      "Structured textures that add depth and character while maintaining durability.",
  },
  {
    name: "Hand Craft (Studios)",
    slug: "studios",
    image: "/collections/studios.png",
    description:
      "Artisan-inspired pieces with handcrafted finishes for a unique dining identity.",
  },
];

/**
 * Material `<select>` values (stored as `product.material`; PLP filters with
 * ?material=<slug>). Includes slugs stored on older products without a homepage tile where noted.
 */
export const MATERIAL_SELECT_OPTIONS = [
  "white",
  "gift-pack",
  "dinner-set",
  "sprinkle",
  "blend",
  "designer",
  "serene",
  "matte",
  "linear",
  "studios",
] as const;

const MATERIAL_OPTION_LABELS: Record<
  (typeof MATERIAL_SELECT_OPTIONS)[number],
  string
> = {
  white: "White",
  "gift-pack": "Gift pack",
  sprinkle: "Sprinkle",
  blend: "Blend",
  designer: "Designer",
  "dinner-set": "Dinner set",
  serene: "Serene",
  matte: "Matte",
  linear: "Linear (pillar)",
  studios: "Studios",
};

/** Deprecated material slug merged into Gift pack (?material=gift-pack). */
const LEGACY_MATERIAL_LABELS: Record<string, string> = {
  charcoal: "Gift pack",
};

/** Human-readable label for admin material dropdowns (value stays slug). */
export function materialAdminLabel(slug: string): string {
  if (LEGACY_MATERIAL_LABELS[slug]) {
    return LEGACY_MATERIAL_LABELS[slug];
  }
  if (slug in MATERIAL_OPTION_LABELS) {
    return MATERIAL_OPTION_LABELS[slug as keyof typeof MATERIAL_OPTION_LABELS];
  }
  return slug;
}

/** Normalize filter slug so legacy rows still match the new catalogue value. */
export function materialSlugMatchesFilter(
  productSlug: string,
  filterSlug: string
): boolean {
  const f = filterSlug.toLowerCase();
  const p = productSlug.toLowerCase();
  if (p === f) return true;
  if (f === "gift-pack" && p === "charcoal") return true;
  if (f === "charcoal" && p === "gift-pack") return true;
  return false;
}

/** Canonical category options plus one legacy row if stored value isn’t in the list. */
export function categoryOptionsForAdminFlat(savedCategory: string): string[] {
  const base = [...ADMIN_CATEGORY_VALUES] as string[];
  const c = canonicalCategoryForAdmin(savedCategory.trim());
  if (c && !base.includes(c)) {
    base.push(c);
  }
  return base;
}

/** Admin edit: canonical material slugs plus legacy slug if missing. */
export function materialOptionsForForms(savedMaterial: string): string[] {
  const base: string[] = [...MATERIAL_SELECT_OPTIONS];
  if (savedMaterial && !base.includes(savedMaterial)) {
    base.push(savedMaterial);
  }
  return base;
}
