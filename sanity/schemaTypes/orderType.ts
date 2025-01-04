import { BasketIcon } from "@sanity/icons"
import {defineField, defineType} from "sanity"

export const orderType = defineType({
name: "order",
title: "Order",
type: "document",
icon: BasketIcon,
fields : [
    defineField({
        name: "orderNumber",
        type: "string",
        title: "Order Number",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "stripeCheckoutSessionId",
        type: "string",
        title: "Stripe Checkout Session ID",
    }),
    defineField({
        name: "StripeCustomerId",
        type: "string",
        title: "Stripe Customer ID",
        validation: (Rule) => Rule.required(),
    }),
    
]




})