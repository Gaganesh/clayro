import ProductsClient from "@/components/ProductList";
import { Suspense } from "react";
import LoadingProducts from "./loading";

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingProducts/>}>
      <ProductsClient />
    </Suspense>
  );
}