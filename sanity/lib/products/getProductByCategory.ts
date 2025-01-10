import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (categorySlug: string) => {
    const PRODUCTS_BY_CATEGORY = defineQuery(`
        *[
            _type == "product"
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
    `);

    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY,
            params: {
                categorySlug, // Map the categorySlug correctly
            },
        });

        return products || []; // Return the products directly
    } catch (error) {
        console.error("Error while fetching products by category:", error);
        return []; // Return an empty array on error
    }
};
