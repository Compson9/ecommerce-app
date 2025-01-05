import { BasketIcon } from "@sanity/icons"
// import { list } from "postcss"
import {defineArrayMember, defineField, defineType} from "sanity"

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
    defineField({
        name: "clerkUserId",
        title: "Store User ID",
        type: "string",
        validation: (Rule) => Rule.required(),
     }),
     defineField({
        name: "customerName",
        title: "Customer Name",
        type: "string",
        validation: (Rule) => Rule.required()
     }),
        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "stripePaymentIntenId",
            title: "Stripe Payment Intent ID",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "Product Bought", 
                            type: "reference",
                            to: [{type: "product"}],
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity Purchased", 
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency"
                        },
                        prepare(select) {
                            return {
                                title: `${select.product} x ${select.quantity}`,
                                subtitle: `${select.quantity} x ${select.price} ${select.currency}`, 
                                media: select.image       
                            }
                        }
                    }
                })
            ]
        }),
        defineField({
            name: "totalPrice",
            title: "Total Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "amountDiscount",
            title: "Amount Discount",
            type: "number",
            validation: (Rule) => Rule.required().min(0)
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    {title: "Pending", value: "pending"},
                    {title: "Paid", value: "paid"},
                    {title: "Shipped", value: "shipped"},
                    {title: "Delivered", value: "delivered"},
                    {title: "Canceled", value: "canceled"}
                ]
            }
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
], 
preview: {
    select: {
        name: "customerName",
        amount: "totalPrice",
        currency: "currency",
        orderId: "orderNumber",
        email: "email",
    },
    prepare(select) {
        const orderIdSnippet = `${select.orderId.slice(0,5)}...${select.orderId.slice()}`;
        return {
            title: `${select.name} - ${orderIdSnippet}`,
            subtitle: `${select.amount} ${select.currency} - ${select.email}`,
            media: BasketIcon
        }
    }
}
})
