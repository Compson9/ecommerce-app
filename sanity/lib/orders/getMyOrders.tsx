import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string){
  if(!userId){
    throw new Error("User Id is required")
  }

  // define the query to get orders by user id
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && userId == $userId] | order(orderDate, desc){
     ...,
      products[]{
       ...,
        product->
      }
    }
    `);

  // fetch orders from Sanity

    try {
      const orders = await sanityFetch({
        query: MY_ORDERS_QUERY,
        params: { userId },
      });
      // return the orders
    
      return orders.data || []
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Error fetching orders")
      
    }
}