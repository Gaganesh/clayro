import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminNav() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold tracking-tight text-gray-900">
          Clayro admin
        </span>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/products"
            className="text-gray-600 hover:text-gray-900"
          >
            Storefront
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-gray-600 hover:text-gray-900"
          >
            Add product
          </Link>
          <AdminLogoutButton />
        </nav>
      </div>
    </header>
  );
}
