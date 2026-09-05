import { CurrencyDollarIcon } from "@phosphor-icons/react/dist/ssr/CurrencyDollar";
import { defineArrayMember, defineField, defineType } from "sanity";

import { buttonsField } from "../internal/schema-fields";

const pricingPlan = defineArrayMember({
  name: "pricingPlan",
  type: "object",
  title: "Plan or service",
  icon: CurrencyDollarIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description:
        "The name of this plan or service, such as Starter or Consulting.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "A short explanation of who this plan or service is for.",
    }),
    defineField({
      name: "priceLabel",
      title: "Price",
      type: "string",
      description:
        'The price as visitors should see it, including currency, such as "$95", "Free", or "Contact us".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "billingLabel",
      title: "Billing label",
      type: "string",
      description:
        'Optional text beside the price: "/ hour" for hourly services, "/ month", "/ project", or "one-time". Leave empty for custom quotes.',
    }),
    defineField({
      name: "features",
      type: "array",
      description: "The included features or services, shown in this order.",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      description:
        "Highlight this plan with a stronger border. Only one plan in this section can be featured.",
    }),
    defineField({
      name: "badge",
      type: "string",
      description:
        'An optional label above the plan name, such as "Most popular" or "Best value".',
    }),
    {
      ...buttonsField,
      title: "Button",
      description:
        "Add one button to sign up, book the service, or request a quote.",
      validation: (Rule) => Rule.max(1),
    },
  ],
  preview: {
    select: { title: "name", price: "priceLabel", billing: "billingLabel" },
    prepare: ({ title, price, billing }) => ({
      title: title || "Untitled plan",
      subtitle: [price, billing].filter(Boolean).join(" "),
    }),
  },
});

export const pricingSchema = defineType({
  name: "pricing",
  title: "Pricing",
  type: "object",
  icon: CurrencyDollarIcon,
  description:
    "Compare plans or services with prices, features, and booking buttons.",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      description: "A short label above the heading, such as Plans & pricing.",
    }),
    defineField({
      name: "title",
      type: "string",
      description: "The main heading for this pricing section.",
    }),
    defineField({
      name: "description",
      title: "Introduction",
      type: "text",
      rows: 3,
      description:
        "A short introduction below the heading to help visitors choose.",
    }),
    defineField({
      name: "plans",
      type: "array",
      description:
        "Add one to three plans or services. Drag to change their display order.",
      of: [pricingPlan],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(3)
          .custom(
            (plans) =>
              (plans?.filter(
                (plan) =>
                  typeof plan === "object" &&
                  plan !== null &&
                  "featured" in plan &&
                  plan.featured === true
              ).length ?? 0) <= 1 ||
              "Feature only one plan per pricing section."
          ),
    }),
    defineField({
      name: "footnote",
      type: "text",
      rows: 2,
      description:
        "Optional details below the cards, such as minimum billable hours or whether taxes are included.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Pricing",
      subtitle: "Pricing",
    }),
  },
});
