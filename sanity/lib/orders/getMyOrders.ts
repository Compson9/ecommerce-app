import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string){
    if(!userId){
        throw new Error("Not authenticated")
    }

    // define a query to get orders by user id
    const My_ORDERS_QUERY = defineQuery( `
        *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
            ...,
            products[]{
                ...,
                product->
            }}
        `);

        try {
            // use sanity fetch to query order
            const orders = await sanityFetch({
                query: My_ORDERS_QUERY,
                params: {userId}
            });
            return orders.data || [];

            
        } catch (error) {
            console.log("Error fetching orders", error);
            throw new Error("Error while fetching orders")
        }
}