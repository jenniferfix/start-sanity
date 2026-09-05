import { pageBuilderToMarkdown } from "../internal/page-builder-to-markdown";
import { pricingToMarkdown } from "./markdown";

test("empty pricing block returns empty Markdown", () => {
  expect(pricingToMarkdown({}, {})).toBe("");
});

test("serializes hourly services through the page builder dispatcher", () => {
  expect(
    pageBuilderToMarkdown(
      [
        {
          _type: "pricing",
          eyebrow: "Services",
          title: "Pricing",
          description: "Choose your service.",
          plans: [
            {
              name: "Consulting",
              badge: "Popular",
              description: "Expert advice.",
              priceLabel: "$95",
              billingLabel: "/ hour",
              features: ["Review", "Report"],
              buttons: [{ text: "Book", href: "/contact" }],
            },
          ],
          footnote: "Two-hour minimum.",
        },
      ],
      { baseUrl: "https://example.com" }
    )
  ).toBe(
    "**Services**\n\n## Pricing\n\nChoose your service.\n\n### Consulting\n\n**Popular**\n\nExpert advice.\n\n$95 / hour\n\n- Review\n- Report\n\n- [Book](https://example.com/contact)\n\nTwo-hour minimum."
  );
});

test("escapes editor text and emits no HTML or JSX tags", () => {
  const result = pricingToMarkdown(
    {
      title: "Plans [2026]",
      plans: [
        {
          name: "Pro_plus",
          description: "<p>Advice</p>",
          features: ["*Support*"],
          priceLabel: "Contact us",
        },
      ],
      footnote: "Terms_apply",
    },
    {}
  );
  expect(result).toContain(String.raw`Plans \[2026\]`);
  expect(result).toContain(String.raw`Pro\_plus`);
  expect(result).toContain(String.raw`\*Support\*`);
  expect(result).toContain(String.raw`Terms\_apply`);
  expect(result).toContain(String.raw`\<p\>Advice\</p\>`);
  expect(result).not.toMatch(/(?<!\\)<\/?[A-Za-z]/);
});

test("preserves custom quotes and omits absent content", () => {
  expect(
    pricingToMarkdown(
      {
        plans: [
          {
            name: "Enterprise",
            priceLabel: "Contact us",
            features: null,
            buttons: null,
          },
        ],
      },
      {}
    )
  ).toBe("### Enterprise\n\nContact us");
});

test("ordinary pricing content emits no HTML or JSX", () => {
  expect(
    pricingToMarkdown(
      {
        title: "Pricing",
        plans: [
          {
            name: "Consulting",
            priceLabel: "$95",
            billingLabel: "/ hour",
            features: ["Advice"],
          },
        ],
      },
      {}
    )
  ).not.toMatch(/<\/?[A-Za-z]/);
});
