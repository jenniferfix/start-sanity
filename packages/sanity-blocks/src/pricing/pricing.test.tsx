import { renderToStaticMarkup } from "react-dom/server";

import { Pricing } from "./index";

test("renders hourly services with features, a booking link, and billing details", () => {
  const html = renderToStaticMarkup(
    <Pricing
      title="Services"
      footnote="Two-hour minimum."
      plans={[
        {
          _key: "consulting",
          name: "Consulting",
          priceLabel: "$95",
          billingLabel: "/ hour",
          features: ["Project review", "Written recommendations"],
          featured: true,
          badge: "Most popular",
          buttons: [{ _key: "book", text: "Book a session", href: "/contact" }],
        },
      ]}
    />
  );
  expect(html).toContain("$95");
  expect(html).toContain("/ hour");
  expect(html).toContain("Project review");
  expect(html).toContain("Most popular");
  expect(html).toContain('href="/contact"');
  expect(html).toContain("Book a session");
  expect(html).toContain("Two-hour minimum.");
  expect(html).toContain("ring-primary");
});

test.each(["/ month", "/ project", "one-time"])(
  "renders the editor's billing label %s",
  (billingLabel) => {
    expect(
      renderToStaticMarkup(
        <Pricing plans={[{ name: "Plan", priceLabel: "$100", billingLabel }]} />
      )
    ).toContain(billingLabel);
  }
);

test("renders custom quotes without adding a billing period or a button", () => {
  const html = renderToStaticMarkup(
    <Pricing plans={[{ name: "Enterprise", priceLabel: "Contact us" }]} />
  );
  expect(html).toContain("Contact us");
  expect(html).not.toContain("/ month");
  expect(html).not.toContain("<a ");
});

test("handles incomplete drafts and preserves plan order", () => {
  expect(() => renderToStaticMarkup(<Pricing plans={null} />)).not.toThrow();
  const html = renderToStaticMarkup(
    <Pricing
      plans={[
        { _key: "a", name: "First" },
        { _key: "b", name: "Second" },
      ]}
    />
  );
  expect(html.indexOf("First")).toBeLessThan(html.indexOf("Second"));
  expect(html).not.toContain("undefined");
});
