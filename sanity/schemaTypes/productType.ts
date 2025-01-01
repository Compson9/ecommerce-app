import { TrolleyIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const ProductType = defineType ({
    name: 'productType',
    title: 'Product type',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "slug",
            type: "slug",
            options: {
                source: "name",
            },
            validation: (Rule) => Rule.required(),   
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
    defineField({
        name: "image",
        title: "Product Image",
        type: "image",
        options: {
            hotspot: true,
        },
    }),
    defineField({
        name: "description",
        title: "Description",
        type: "blockContent",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "categories",
        title: "Categories",
        type: "array",
        of: [{ type: "reference", to: { type: "category" } }],
        validation: (Rule) => Rule.required(),
    }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            subtitle: "price"
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.subtitle}`,
                media: select.media
            }
        }
    },

})