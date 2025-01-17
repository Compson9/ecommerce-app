"use server "

import stripe from "@/lib/stripe";
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

        // check for existing customer email 
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1
        });

        let customerId: string | undefined;
        if(customers.data.length > 0){
            customerId = customers.data[0].id;
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${`https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderName=${metadata.orderNumber}`,
            cancel_url: `${`https://${process.env.VERCEL_URE}` || process.env.NEXT_PUBLIC_BASE_URL}/basket`,
            line_items: items.map((item)=> (
                {
                    quantity: item.quantity,
                    price_data: {
                        currency: "cedis",
                        unit_amount: Math.round(item.product.price! * 100),
                        
                    }
                }
            ))
        })
        
    } catch (error) {
        console.log("Error creating checkout session", error);
        throw error
    }

}