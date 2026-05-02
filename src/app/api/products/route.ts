import { canonicalCategoryForAdmin } from "@/constants/catalog";
import { requireAdminSession } from "@/lib/admin-api";
import cloudinary from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = canonicalCategoryForAdmin(
      (formData.get("category") as string)?.trim() ?? ""
    );
    const material = formData.get("material") as string;
    const size = formData.get("size") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    // 🔥 CONVERT FILE → BUFFER
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🔥 UPLOAD TO CLOUDINARY
    const uploadResponse = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "clayro" },
            (error, result) => {
              if (error) reject(error);
              else if (result)
                resolve(result as { secure_url: string });
              else reject(new Error("Upload failed"));
            }
          )
          .end(buffer);
      }
    );

    const imageUrl = uploadResponse.secure_url;

    // 🔥 AUTO GENERATE ID
    const id =
      name.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Date.now();

    const startingPriceRaw = formData.get("startingPrice") as string | null;
    const product: Record<string, unknown> = {
      id,
      name,
      category,
      material,
      size,
      description,
      image: imageUrl,
      createdAt: new Date(),
    };
    if (startingPriceRaw != null && startingPriceRaw !== "") {
      const n = Number(startingPriceRaw);
      if (!Number.isNaN(n)) {
        product.startingPrice = n;
      }
    }

    // 🔥 SAVE TO MONGODB
    const client = await clientPromise;
    const db = client.db("clayro");

    await db.collection("products").insertOne(product);

    return NextResponse.json({ success: true, product });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("clayro");

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}