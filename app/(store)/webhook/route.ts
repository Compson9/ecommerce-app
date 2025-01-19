import { headers } from "next/headers"
import {NextRequest, NextResponse} from "next/server"
import Stripe from "stripe";

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
    }

    

}