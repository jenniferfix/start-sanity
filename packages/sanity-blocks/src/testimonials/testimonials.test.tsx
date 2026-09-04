import { Testimonials } from "@workspace/sanity-blocks/testimonials/index";
import { renderToStaticMarkup } from "react-dom/server";

test("Testimonials renders the quote list", () => {
  const html = renderToStaticMarkup(
    <Testimonials
      eyebrow="Customers"
      testimonials={[
        {
          _key: "quote-1",
          authorName: "Jane Doe",
          authorRole: "Head of Design",
          company: "Acme Inc",
          quote: [
            {
              _type: "block",
              _key: "block-1",
              children: [{ _type: "span", text: "It shipped in a week." }],
            },
          ],
        },
      ]}
      title="What teams say"
    />
  );

  expect(html).toMatch(/What teams say/);
  expect(html).toMatch(/It shipped in a week/);
  expect(html).toMatch(/Jane Doe/);
  expect(html).toMatch(/Head of Design, Acme Inc/);
});

test("Testimonials renders the header with no quotes", () => {
  const html = renderToStaticMarkup(<Testimonials title="No quotes yet" />);

  expect(html).toMatch(/No quotes yet/);
});

test("Testimonials omits the attribution line when role and company are unset", () => {
  const html = renderToStaticMarkup(
    <Testimonials
      testimonials={[{ _key: "quote-1", authorName: "Solo Author" }]}
      title="Quotes"
    />
  );

  expect(html).toMatch(/Solo Author/);
  expect(html).not.toMatch(/truncate text-muted-foreground/);
});
