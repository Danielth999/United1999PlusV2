import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req) => {
  const category = req.nextUrl.searchParams.get('category');
  const search = req.nextUrl.searchParams.get('search') || "";
  const page = parseInt(req.nextUrl.searchParams.get('page') || "1", 10);
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || "20", 10);
  const offset = (page - 1) * limit;

  try {
    let products;
    let totalProducts;

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
        skip: offset,
        take: limit,
      });
      totalProducts = await prisma.product.count({
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
    } else {
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
        skip: offset,
        take: limit,
      });
      totalProducts = await prisma.product.count({
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
    }

    if (!products.length) {
      return new Response(JSON.stringify({ message: "No products found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ products, totalProducts, currentPage: page, totalPages: Math.ceil(totalProducts / limit) }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
