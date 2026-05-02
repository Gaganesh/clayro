import ProductsClient from "@/components/ProductsClient";
import { isAdminAuthenticated } from "@/lib/admin-api";
import { getMergedProductsForPlp } from "@/lib/catalogue";
import { Suspense } from "react";
import LoadingProducts from "./loading";

async function ProductsWithData() {
  const [initialProducts, isAdmin] = await Promise.all([
    getMergedProductsForPlp(),
    isAdminAuthenticated(),
  ]);
  return (
    <ProductsClient initialProducts={initialProducts} isAdmin={isAdmin} />
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingProducts />}>
      <ProductsWithData />
    </Suspense>
  );
}
