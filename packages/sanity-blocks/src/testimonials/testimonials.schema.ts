import {
  definePortableTextField,
  imageWithAltField,
} from "@workspace/sanity-blocks/internal/schema-fields";
import { Quote } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

const testimonialItem = defineArrayMember({
  name: "testimonialItem",
  type: "object",
  title: "Testimonial",
  icon: Quote,
  fields: [
    definePortableTextField(["block"], {
      name: "quote",
      title: "Quote",
      description:
        "What the customer said, in their own words. Use the Strong style on the sentence that should stand out; the rest of the quote appears muted.",
    }),
    defineField({
      name: "authorName",
      type: "string",
      title: "Author Name",
      description:
        'The full name of the person being quoted, for example "Jane Doe"',
      validation: (Rule) =>
        Rule.required().error("Every testimonial needs an author name"),
    }),
    defineField({
      name: "authorRole",
      type: "string",
      title: "Author Role",
      description: 'The person’s job title, for example "Head of Design"',
    }),
    defineField({
      name: "company",
      type: "string",
      title: "Company",
      description:
        'The company the person works for, for example "Acme Inc". Shown next to their role.',
    }),
    imageWithAltField({
      name: "authorImage",
      title: "Author Photo",
      description:
        "A photo of the person being quoted, shown as a small avatar beside their name. Remember to add alt text.",
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      role: "authorRole",
      company: "company",
      media: "authorImage",
    },
    prepare: ({ title, role, company, media }) => ({
      title: title || "Untitled testimonial",
      subtitle: [role, company].filter(Boolean).join(", ") || "Testimonial",
      media,
    }),
  },
});

export const testimonialsSchema = defineType({
  name: "testimonials",
  type: "object",
  title: "Testimonials",
  description:
    "A grid of customer quotes. Add each quote as an item below — visitors see them in the order you arrange here.",
  icon: Quote,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description:
        "The smaller text that sits above the title to provide context",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The large text that is the primary focus of the block",
    }),
    definePortableTextField(["block"], {
      name: "richText",
      description:
        "The short paragraph beneath the title, setting up who these customers are",
    }),
    defineField({
      name: "testimonials",
      type: "array",
      title: "Testimonials",
      description:
        "The quotes shown in the grid. Drag to reorder. Three or six reads best, since the grid is three columns wide on large screens.",
      of: [testimonialItem],
    }),
  ],
  preview: {
    select: {
      title: "title",
      testimonials: "testimonials",
    },
    prepare: ({ title, testimonials = [] }) => {
      const count = Array.isArray(testimonials) ? testimonials.length : 0;
      const label = count === 1 ? "quote" : "quotes";
      return {
        title: title || "Testimonials",
        subtitle: `${count} ${label}`,
      };
    },
  },
});
