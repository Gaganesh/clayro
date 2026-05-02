import AdminNav from "@/components/admin/AdminNav";
import { isAdminAuthenticated } from "@/lib/admin-api";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
