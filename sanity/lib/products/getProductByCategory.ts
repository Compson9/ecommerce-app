import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categorySlug: string) => {
    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product"
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
    `);

    try {
        const result = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categorySlug, // Map the categorySlug correctly
            },
        });

        // Ensure the result is an array
        return result.data || [];
    } catch (error) {
        console.error("Error while fetching products by category:", error);
        return []; // Return an empty array on error
    }
};