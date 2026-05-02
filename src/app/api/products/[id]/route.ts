import { canonicalCategoryForAdmin } from "@/constants/catalog";
import { requireAdminSession } from "@/lib/admin-api";
import cloudinary from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

function uploadBuffer(buffer: Buffer): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "clayro" }, (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result as { secure_url: string });
        else reject(new Error("Upload failed"));
      })
      .end(buffer);
  });
}

export async function PATCH(req: Request, context: Ctx) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db("clayro");
    const existing = await db.collection("products").findOne({ id });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = (formData.get("name") as string)?.trim();
    const category = canonicalCategoryForAdmin(
      (formData.get("category") as string)?.trim() ?? ""
    );
    const material = (formData.get("material") as string)?.trim();
    const size = (formData.get("size") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const startingPriceRaw = formData.get("startingPrice") as string | null;
    const file = formData.get("image") as File | null;

    if (!name || !category || !material || !size || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updateDoc: Record<string, unknown> = {
      name,
      category,
      material,
      size,
      description,
      updatedAt: new Date(),
    };

    if (startingPriceRaw != null && startingPriceRaw !== "") {
      const n = Number(startingPriceRaw);
      if (!Number.isNaN(n)) {
        updateDoc.startingPrice = n;
      }
    }

    if (file && typeof file === "object" && "size" in file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploaded = await uploadBuffer(buffer);
      updateDoc.image = uploaded.secure_url;
    }

    await db.collection("products").updateOne({ id }, { $set: updateDoc });
    const updated = await db.collection("products").findOne({ id });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db("clayro");

    const result = await db.collection("products").deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
