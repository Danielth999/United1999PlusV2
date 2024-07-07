import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await prisma.image.findMany();
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { message: "Error fetching images" },
      { status: 500 }
    );
  }
}
