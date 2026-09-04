import { testimonialsToMarkdown } from "./markdown";

const para = (text: string) => [
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  },
];

test("testimonialsToMarkdown returns empty string for a fully empty block", () => {
  expect(testimonialsToMarkdown({}, {})).toBe("");
});

test("testimonialsToMarkdown renders eyebrow, title, and richText joined by blank lines", () => {
  const result = testimonialsToMarkdown(
    {
      eyebrow: "Customers",
      title: "What teams say",
      richText: para("Real quotes from real teams."),
    },
    {}
  );

  expect(result).toBe(
    "**Customers**\n\n## What teams say\n\nReal quotes from real teams."
  );
});

test("testimonialsToMarkdown renders each quote as a blockquote with attribution", () => {
  const result = testimonialsToMarkdown(
    {
      testimonials: [
        {
          _key: "q1",
          quote: para("It shipped in a week."),
          authorName: "Jane Doe",
          authorRole: "Head of Design",
          company: "Acme Inc",
        },
      ],
    },
    {}
  );

  expect(result).toBe(
    "> It shipped in a week.\n>\n> — Jane Doe, Head of Design, Acme Inc"
  );
});

test("testimonialsToMarkdown prefixes every line of a multi-paragraph quote", () => {
  const result = testimonialsToMarkdown(
    {
      testimonials: [
        {
          _key: "q1",
          quote: [...para("First point."), ...para("Second point.")],
          authorName: "Jane Doe",
        },
      ],
    },
    {}
  );

  for (const line of result.split("\n")) {
    expect(line.startsWith(">")).toBe(true);
  }
  expect(result).toContain("> First point.");
  expect(result).toContain("> Second point.");
});

test("testimonialsToMarkdown separates multiple quotes by a blank line", () => {
  const result = testimonialsToMarkdown(
    {
      testimonials: [
        { _key: "q1", quote: para("One."), authorName: "A" },
        { _key: "q2", quote: para("Two."), authorName: "B" },
      ],
    },
    {}
  );

  expect(result).toBe("> One.\n>\n> — A\n\n> Two.\n>\n> — B");
});

test("testimonialsToMarkdown omits a testimonial with no quote and no attribution", () => {
  expect(testimonialsToMarkdown({ testimonials: [{ _key: "q1" }] }, {})).toBe(
    ""
  );
});

test("testimonialsToMarkdown escapes markdown chars in the attribution", () => {
  const result = testimonialsToMarkdown(
    {
      testimonials: [
        { _key: "q1", quote: para("Good."), authorName: "user_name [1]" },
      ],
    },
    {}
  );

  expect(result).toContain("— user\\_name \\[1\\]");
});

test("testimonialsToMarkdown escapes markdown chars in eyebrow and title", () => {
  const result = testimonialsToMarkdown(
    { eyebrow: "#1 _Pick_", title: "user_name & [more]" },
    {}
  );

  expect(result).toBe("**\\#1 \\_Pick\\_**\n\n## user\\_name & \\[more\\]");
});

test("testimonialsToMarkdown handles undefined richText without throwing", () => {
  expect(() =>
    testimonialsToMarkdown({ title: "T", richText: undefined }, {})
  ).not.toThrow();
});

test("testimonialsToMarkdown emits no HTML or JSX tags", () => {
  const result = testimonialsToMarkdown(
    {
      eyebrow: "E",
      title: "T",
      richText: para("Body."),
      testimonials: [
        {
          _key: "q1",
          quote: para("Quote."),
          authorName: "Jane Doe",
          authorRole: "CEO",
          company: "Acme",
        },
      ],
    },
    {}
  );

  expect(result).not.toMatch(/<\/?[A-Za-z]/);
});
