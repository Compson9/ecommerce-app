"use server "

import { BasketItem } from "@/store/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export type GroupedBasketItem = {
    product: BasketItem["product"]
    quantity: number;
}

export async function createCheckOutSession(
    items:GroupedBasketItem[],
    metadata: Metadata

){
    try {
        // check it any product does not have a price
        const itemWithoutPrice = items.filter((item) => item.product.price)
        if(itemWithoutPrice.length > 0) {
            throw new Error("Cannot checkout with an item without price")
        }
        
    } catch (error) {
        console.log("Error creating checkout session", error);
        throw error
    }

}