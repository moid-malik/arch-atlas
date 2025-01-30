import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            title: "Title",
            name: "title",
            type: "string"
        }),
        defineField({
            title: "Image",
            name: "image",
            type: "image"
        }),
        defineField({
            title: "Color",
            name: "color",
            type: "string"
        }),
        defineField({
            title: "Price",
            name: "price",
            type: "number"
        }),
         defineField({
            title: "Weight (lb)",
            name: "weight",
            type: "number",
        }),
        defineField({
            title: "Length (in)",
            name: "length",
            type: "number",
        }),
        defineField({
            title: "Width (in)",
            name: "width",
            type: "number",
        }),
         defineField({
            title: "Height (in)",
            name: "height",
            type: "number",
        }),
        defineField({
            title: "Purchases",
            name: "purchases",
            type: "number",
        }),
    ]
});
