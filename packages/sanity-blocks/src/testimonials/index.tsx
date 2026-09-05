import { QuotesIcon } from "@phosphor-icons/react/dist/ssr/Quotes";
import { BlockHeader } from "@workspace/sanity-blocks/internal/block-header";
import type { RichTextValue } from "@workspace/sanity-blocks/internal/rich-text";
import { RichText } from "@workspace/sanity-blocks/internal/rich-text";
import type { SanityImageData } from "@workspace/sanity-blocks/internal/sanity-image";
import { SanityImage } from "@workspace/sanity-blocks/internal/sanity-image";

export interface TestimonialItem {
  _key?: string | null;
  authorImage?: SanityImageData | null;
  authorName?: string | null;
  authorRole?: string | null;
  company?: string | null;
  quote?: RichTextValue;
}

export interface TestimonialsProps {
  eyebrow?: string | null;
  richText?: RichTextValue;
  testimonials?: TestimonialItem[] | null;
  title?: string | null;
}

/** Role and company read as one line; either half may be missing. */
function attributionOf(testimonial: TestimonialItem): string {
  return [testimonial.authorRole, testimonial.company]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(", ");
}

function TestimonialCard({
  testimonial,
}: Readonly<{ testimonial: TestimonialItem }>) {
  const { quote, authorName, authorImage } = testimonial;
  const attribution = attributionOf(testimonial);

  return (
    <figure className="flex h-full min-w-0 flex-col gap-8 bg-background p-8 text-foreground">
      <QuotesIcon
        aria-hidden="true"
        className="size-6 shrink-0 text-muted-foreground"
      />
      <blockquote className="min-w-0">
        <RichText
          className="body-text break-words text-muted-foreground [&_strong]:font-normal [&_strong]:text-foreground"
          richText={quote}
        />
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-4">
        {authorImage?.id && (
          <div className="size-[42px] shrink-0 overflow-hidden">
            <SanityImage
              className="h-full w-full rounded-none! object-cover"
              height={42}
              image={authorImage}
              loading="lazy"
              width={42}
            />
          </div>
        )}
        <div className="flex min-w-0 flex-col text-base leading-6">
          {authorName && (
            <span className="truncate font-medium text-foreground">
              {authorName}
            </span>
          )}
          {attribution && (
            <span className="truncate text-muted-foreground">
              {attribution}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials({
  eyebrow,
  title,
  richText,
  testimonials,
}: Readonly<TestimonialsProps>) {
  const items = testimonials ?? [];

  return (
    <section className="block-section" id="testimonials">
      <div className="container">
        <BlockHeader eyebrow={eyebrow} title={title}>
          <RichText
            className="body-text max-w-xl text-muted-foreground"
            richText={richText}
          />
        </BlockHeader>
        {items.length > 0 && (
          <div className="bleed-x mt-12 bg-grid-dots p-[var(--container-px,0.5rem)] text-zinc-800 md:mt-16 lg:p-[42px] dark:text-zinc-50 [background-size:7px_7px]">
            <div className="grid gap-[var(--container-px,0.5rem)] md:grid-cols-2 lg:grid-cols-3">
              {items.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial._key ?? `Testimonial-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
