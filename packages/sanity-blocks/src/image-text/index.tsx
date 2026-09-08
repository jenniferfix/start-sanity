import { BlockHeader } from "@workspace/sanity-blocks/internal/block-header";
import {
  RichText,
  type RichTextValue,
} from "@workspace/sanity-blocks/internal/rich-text";
import {
  SanityButtons,
  type ButtonProps,
} from "@workspace/sanity-blocks/internal/sanity-buttons";
import {
  SanityImage,
  resolveAssetId,
  type SanityImageData,
} from "@workspace/sanity-blocks/internal/sanity-image";
import { cn } from "@workspace/tailwind-config/utils";
import { stegaClean } from "next-sanity";

export interface ImageTextProps {
  image?: SanityImageData | null;
  imagePosition?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  richText?: RichTextValue;
  buttons?: ButtonProps[] | null;
}

export function ImageText({
  image,
  imagePosition,
  eyebrow,
  title,
  richText,
  buttons,
}: Readonly<ImageTextProps>) {
  const hasImage = Boolean(resolveAssetId(image));
  const imageOnRight = stegaClean(imagePosition) === "right";

  return (
    <section className="block-section">
      <div
        className={cn(
          "container grid grid-cols-1 items-center gap-8 md:gap-12",
          hasImage && "md:grid-cols-2"
        )}
      >
        {/* Source order is always image then text; only desktop grid placement changes. */}
        {hasImage && image ? (
          <div
            className={cn(
              "min-w-0 md:row-start-1",
              imageOnRight ? "md:col-start-2" : "md:col-start-1"
            )}
          >
            <SanityImage
              image={image}
              width={1200}
              height={900}
              mode="cover"
              className="aspect-[4/3] h-auto w-full rounded-lg object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ) : null}
        <div
          className={cn(
            "grid min-w-0 gap-6",
            hasImage && "md:row-start-1",
            hasImage && (imageOnRight ? "md:col-start-1" : "md:col-start-2")
          )}
        >
          <BlockHeader eyebrow={eyebrow} title={title}>
            <RichText
              className="body-text text-muted-foreground"
              richText={richText}
            />
          </BlockHeader>
          <SanityButtons buttons={buttons} />
        </div>
      </div>
    </section>
  );
}
