import { backendClient } from "@/sanity/lib/backendClient";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Define a query to get orders by user id
  const My_ORDERS_QUERY = `
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
      ...,
      products[]{
        ...
      }
    }
  `;

  try {
    // Use sanity fetch to query order
    const orders = await backendClient.fetch(My_ORDERS_QUERY, { userId });
    console.log("Fetched orders:", orders); // Log fetched orders
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
}