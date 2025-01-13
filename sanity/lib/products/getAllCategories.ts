import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(`
        *[_type == "category"] | order(name asc)
    `);
    try {
        const result = await sanityFetch({
            query: ALL_CATEGORIES_QUERY,
        });

        // Ensure the result is an array
        return result.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Return an empty array on error
    }
}