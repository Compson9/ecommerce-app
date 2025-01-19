import { Metadata } from "@/actions/createCheckOutSession";
import { headers } from "next/headers"
import {NextRequest, NextResponse} from "next/server"
import Stripe from "stripe";
import stripe from "@/lib/stripe"



export async function POST(req: NextRequest){
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if(!sig){
        return NextResponse.json({error: "No signature found"}, {status: 400})
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if(!webhookSecret){
        return NextResponse.json({error: "No webhook secret found"}, {status: 400})
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (error) {
        console.log("Webhook signature verification failed", error);
        return NextResponse.json({error:   `Webhook Error: ${error}`}, 
            {status: 400});
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const  order = await createOrderInSanity(session);
            console.log("Order created in Sanity", order);
        } catch (error) {
            console.log("Error creating order in Sanity", error);
            return NextResponse.json({error: `Error creating order: ${error}`},
                {status: 500});
    
        }
    }

    return NextResponse.json({received: true});

}

async function createOrderInSanity(session: Stripe.Checkout.Session){

    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details
    } =session;

    // Create an order in your own database or Sanity CMS here
    const {orderNumber, customerName, customerEmail, clerkUserId} = metadata as Metadata;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id, 
        {
            expand: ["order.price.product"],
        }
     );
     const sanityProducts = lineItemsWithProduct.data.map((item)=> ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id
        }
     }));

}