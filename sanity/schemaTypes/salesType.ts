import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: "sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
defineField({
    name: "title",
    title: "sales Title",
    type: "string",
}), 
defineField({
    name: "description",
    title: "Sale Description",
    type: "text",
}), 
defineField({
    name: "discountAmount", 
    title: "Discount Amount", 
    type: "number",
    description: "The amount in percentage or fixed value",
}), 
defineField({
    name: "couponCode",
    title: "Coupon Code",
    type: "string",
}),
defineField({
    name: "validFrom",
    title: "Valid From",
    type: "datetime",
}),
defineField({
    name: "validUntil",
    title: "Valid Until",
    type: "datetime",
}),


    ]
})