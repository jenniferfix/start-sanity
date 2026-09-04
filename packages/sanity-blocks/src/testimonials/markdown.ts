import {
  eyebrowToMarkdown,
  headingToMarkdown,
  joinSections,
  type MarkdownBlock,
  type MarkdownOptions,
  type MarkdownTestimonial,
} from "../internal/markdown";
import {
  escapeMarkdown,
  portableTextToMarkdown,
} from "../internal/portable-text-to-markdown";

/** Prefixes every line so a multi-paragraph quote stays one blockquote. */
function asBlockquote(markdown: string): string {
  const trimmed = markdown.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed
    .split("\n")
    .map((line) => (line.trim() ? `> ${line}` : ">"))
    .join("\n");
}

function attributionOf(testimonial: MarkdownTestimonial): string {
  return [testimonial.authorName, testimonial.authorRole, testimonial.company]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .map((value) => escapeMarkdown(value))
    .join(", ");
}

/** Quote and attribution share one blockquote so they never drift apart. */
function testimonialToMarkdown(
  testimonial: MarkdownTestimonial,
  options: MarkdownOptions
): string {
  const quote = portableTextToMarkdown(testimonial.quote, options);
  const attribution = attributionOf(testimonial);
  return asBlockquote(
    joinSections([quote, attribution ? `— ${attribution}` : ""])
  );
}

export function testimonialsToMarkdown(
  block: MarkdownBlock,
  options: MarkdownOptions
): string {
  const quotes = (block.testimonials ?? []).map((testimonial) =>
    testimonialToMarkdown(testimonial, options)
  );

  return joinSections([
    eyebrowToMarkdown(block.eyebrow),
    headingToMarkdown(block.title, 2),
    portableTextToMarkdown(block.richText, options),
    ...quotes,
  ]);
}
