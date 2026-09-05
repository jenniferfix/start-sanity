import {
  buttonsToMarkdown,
  eyebrowToMarkdown,
  headingToMarkdown,
  joinSections,
  type MarkdownBlock,
  type MarkdownOptions,
} from "../internal/markdown";
import { escapeMarkdown } from "../internal/portable-text-to-markdown";

export function pricingToMarkdown(
  block: MarkdownBlock,
  options: MarkdownOptions
): string {
  return joinSections([
    eyebrowToMarkdown(block.eyebrow),
    headingToMarkdown(block.title, 2),
    escapeMarkdown(block.description ?? ""),
    ...(block.plans ?? []).map((plan) =>
      joinSections([
        headingToMarkdown(plan.name, 3),
        eyebrowToMarkdown(plan.badge),
        escapeMarkdown(plan.description ?? ""),
        escapeMarkdown(
          plan.priceLabel
            ? [plan.priceLabel, plan.billingLabel].filter(Boolean).join(" ")
            : ""
        ),
        plan.features
          ?.filter((feature) => feature.trim())
          .map((feature) => `- ${escapeMarkdown(feature.replace(/\s+/g, " "))}`)
          .join("\n"),
        buttonsToMarkdown(plan.buttons, options),
      ])
    ),
    escapeMarkdown(block.footnote ?? ""),
  ]);
}
