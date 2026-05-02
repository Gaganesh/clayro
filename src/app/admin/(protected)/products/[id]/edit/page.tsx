import ProductEditForm from "@/components/admin/ProductEditForm";
import { getProductById } from "@/lib/catalogue";
import {
  buildProductsListingHref,
  plpQueryFromSearchParams,
} from "@/lib/plp-query";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminEditProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const plpQuery = plpQueryFromSearchParams(sp);
  const backToPlp = buildProductsListingHref(plpQuery);

  const product = await getProductById(id);
  if (!product) {
    notFound();
  }

  if (!product.isFromDatabase) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">
          Cannot edit in admin
        </h1>
        <p className="mt-3 text-gray-600">
          This item comes from the static catalogue file{" "}
          <code className="rounded bg-gray-100 px-1">src/data/products.ts</code>,
          not the database. Update it in code, or add a duplicate via{" "}
          <Link href="/admin/dashboard" className="text-amber-900 underline">
            Add product
          </Link>
          .
        </p>
        <Link
          href={backToPlp}
          className="mt-6 inline-block text-sm font-medium text-amber-900 underline"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  return <ProductEditForm product={product} plpQuery={plpQuery} />;
}
