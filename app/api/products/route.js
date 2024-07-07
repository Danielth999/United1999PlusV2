import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req) => {
  const category = req.nextUrl.searchParams.get('category');
  const search = req.nextUrl.searchParams.get('search') || "";

  try {
    let products;

    if (category) {
      products = await prisma.product.findMany({
        where: {
          Category: {
            nameSlug: category,
          },
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          ],
        },
      });
    } else if (search) {
      products = await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          ],
        },
      });
    } else {
      products = await prisma.product.findMany();
    }

    if (!products.length) {
      return new Response(JSON.stringify({ message: "No products found" }), { status: 404 });
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
