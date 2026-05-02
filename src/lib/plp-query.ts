/** Category / material filters as used on `/products` and admin edit return URLs. */
export type PlpFilterQuery = {
  category?: string;
  material?: string;
};

export function plpQueryFromSearchParams(
  sp: Record<string, string | string[] | undefined> | undefined
): PlpFilterQuery {
  if (!sp) return {};
  const cat = sp.category;
  const mat = sp.material;
  return {
    category: typeof cat === "string" ? cat : undefined,
    material: typeof mat === "string" ? mat : undefined,
  };
}

export function buildProductsListingHref(q: PlpFilterQuery): string {
  const p = new URLSearchParams();
  if (q.category) p.set("category", q.category);
  if (q.material) p.set("material", q.material);
  const s = p.toString();
  return s ? `/products?${s}` : "/products";
}

export function buildAdminEditProductHref(
  id: string,
  q: PlpFilterQuery
): string {
  const base = `/admin/products/${encodeURIComponent(id)}/edit`;
  const p = new URLSearchParams();
  if (q.category) p.set("category", q.category);
  if (q.material) p.set("material", q.material);
  const s = p.toString();
  return s ? `${base}?${s}` : base;
}
