import clientPromise from "@/lib/mongodb";
import { products as staticProducts } from "@/data/products";

/** Single row on the product listing page (DB + static catalogue). */
export type PlpProduct = {
  id: string;
  name: string;
  category: string;
  material: string;
  size: string;
  description: string;
  image: string;
  startingPrice?: number;
  isFromDatabase: boolean;
};

export async function getMergedProductsForPlp(): Promise<PlpProduct[]> {
  try {
    const client = await clientPromise;
    const db = client.db("clayro");
    const rows = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const fromDb: PlpProduct[] = rows.map((doc) => {
      const d = doc as Record<string, unknown>;
      return {
        id: String(d.id ?? ""),
        name: String(d.name ?? ""),
        category: String(d.category ?? ""),
        material: String(d.material ?? ""),
        size: String(d.size ?? ""),
        description: String(d.description ?? ""),
        image: String(d.image ?? ""),
        startingPrice:
          typeof d.startingPrice === "number" ? d.startingPrice : undefined,
        isFromDatabase: true,
      };
    });

    const fromStatic: PlpProduct[] = staticProducts.map((p) => ({
      ...p,
      isFromDatabase: false,
    }));

    return [...fromDb, ...fromStatic];
  } catch {
    return staticProducts.map((p) => ({
      ...p,
      isFromDatabase: false,
    }));
  }
}

/** Resolve one product for admin edit / PDP-style lookups. */
export async function getProductById(
  id: string
): Promise<PlpProduct | null> {
  try {
    const client = await clientPromise;
    const db = client.db("clayro");
    const doc = await db.collection("products").findOne({ id });
    if (doc) {
      const d = doc as Record<string, unknown>;
      return {
        id: String(d.id ?? ""),
        name: String(d.name ?? ""),
        category: String(d.category ?? ""),
        material: String(d.material ?? ""),
        size: String(d.size ?? ""),
        description: String(d.description ?? ""),
        image: String(d.image ?? ""),
        startingPrice:
          typeof d.startingPrice === "number" ? d.startingPrice : undefined,
        isFromDatabase: true,
      };
    }
  } catch {
    /* fall through */
  }
  const p = staticProducts.find((x) => x.id === id);
  if (p) {
    return { ...p, isFromDatabase: false };
  }
  return null;
}
