import {
  buttonsToMarkdown,
  eyebrowToMarkdown,
  headingToMarkdown,
  imageToMarkdown,
  joinSections,
  type MarkdownBlock,
  type MarkdownOptions,
} from "../internal/markdown";
import { portableTextToMarkdown } from "../internal/portable-text-to-markdown";

export function imageTextToMarkdown(
  block: MarkdownBlock,
  options: MarkdownOptions
): string {
  return joinSections([
    imageToMarkdown(block.image, options),
    eyebrowToMarkdown(block.eyebrow),
    headingToMarkdown(block.title, 2),
    portableTextToMarkdown(block.richText, options),
    buttonsToMarkdown(block.buttons, options),
  ]);
}
