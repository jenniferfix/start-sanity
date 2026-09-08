import { pageBuilderToMarkdown } from "../internal/page-builder-to-markdown";
import { imageTextToMarkdown } from "./markdown";

test("empty image/text blocks produce no Markdown", () => {
  expect(imageTextToMarkdown({}, {})).toBe("");
});

test("the page builder serializes image first, then text and buttons", () => {
  const result = pageBuilderToMarkdown(
    [
      {
        _type: "imageText",
        image: { id: "image-abc-1200x900-jpg", alt: "Mountain" },
        eyebrow: "Discover",
        title: "Explore",
        richText: [
          {
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text: "A new view." }],
          },
        ],
        buttons: [{ text: "Learn more", href: "/explore" }],
      },
    ],
    { resolveImageUrl: () => "https://example.com/mountain.jpg" }
  );
  expect(result).toBe(
    "![Mountain](https://example.com/mountain.jpg)\n\n**Discover**\n\n## Explore\n\nA new view.\n\n- [Learn more](/explore)"
  );
  expect(result).not.toMatch(/<\/?[A-Za-z]/);
});

test("escapes Markdown in headings", () => {
  expect(imageTextToMarkdown({ title: "A [new] view" }, {})).toBe(
    "## A \\[new\\] view"
  );
});
