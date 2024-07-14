import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// เริ่มต้นการใช้ Prisma Client
const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error(error);
  }
};
