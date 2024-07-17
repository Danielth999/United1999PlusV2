export const fetchProducts = async (page, search, category, sortOrder) => {
     try {
       const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}&limit=10&search=${search}&category=${category}&sortOrder=${sortOrder}`,{
          cache:'no-store'
         }
       );
       if (!res.ok) {
         throw new Error(`An error occurred: ${res.statusText}`);
       }
       const data = await res.json();
       return data;
     } catch (error) {
       console.error("Failed to fetch products:", error);
       return { products: [], totalProducts: 0, currentPage: 1, totalPages: 1 };
     }
   };
   
   export const fetchCategories = async () => {
     try {
       const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
       );
       if (!res.ok) {
         throw new Error(`An error occurred: ${res.statusText}`);
       }
       const data = await res.json();
       return data;
     } catch (error) {
       console.error("Failed to fetch categories:", error);
       return [];
     }
   };
   