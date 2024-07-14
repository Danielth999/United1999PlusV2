import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (req) => {
  const category = req.nextUrl.searchParams.get('category');
  const search = req.nextUrl.searchParams.get('search') || "";
  const page = parseInt(req.nextUrl.searchParams.get('page') || "1", 10);
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || "20", 10);
  const sortOrder = req.nextUrl.searchParams.get('sortOrder') || "newest";
  const offset = (page - 1) * limit;

  try {
    const queryConditions = {
      AND: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };

    if (category) {
      queryConditions.AND.push({
        categoryId: parseInt(category, 10),
      });
    }

    const orderBy = sortOrder === "oldest" ? { createdAt: 'asc' } : { createdAt: 'desc' };

    const products = await prisma.product.findMany({
      where: queryConditions,
      skip: offset,
      take: limit,
      orderBy,
      include: {
        Category: true,
      },
    });

    const totalProducts = await prisma.product.count({
      where: queryConditions,
    });

    return NextResponse.json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const name = data.get('name');
    const description = data.get('description');
    const categoryId = parseInt(data.get('categoryId'));
    const color = data.get('color');
    const size = data.get('size');
    const quantity = data.get('quantity');
    const isPublished = data.get('isPublished') === 'true';
    const image = data.get('image');

    if (!name || !description || !categoryId || !color || !size || !quantity || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const fileName = `${uuidv4()}.webp`;

    const buffer = await sharp(await image.arrayBuffer())
      .resize({ width: 800 })
      .webp()
      .toBuffer();

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, buffer, { contentType: 'image/webp' });

    if (uploadError) {
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        color,
        size,
        stock: quantity,
        imageUrl: publicUrl,
        isPublished,
      },
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
