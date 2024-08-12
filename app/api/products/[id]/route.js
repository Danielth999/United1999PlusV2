import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient'; // นำเข้า supabase จาก lib/supabaseClient.js

const prisma = new PrismaClient();

// Function to get product by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
   
    const product = await prisma.product.findUnique({
      where: { productId: parseInt(id, 10) },
      include: { Category: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// Function to delete product by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const product = await prisma.product.delete({
      where: { productId: parseInt(id, 10) },
    });

    // ลบภาพจาก Supabase storage แบบ asynchronous
    if (product.imageUrl) {
      const fileName = new URL(product.imageUrl).pathname.split('/').pop();
      supabase.storage
        .from('products')
        .remove([fileName])
        .then(({ error }) => {
          if (error) {
            console.error('Error deleting image from Supabase:', error);
          }
        });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
