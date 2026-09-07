import { ImagesIcon } from "@phosphor-icons/react/dist/ssr/Images";
import {
  buttonsField,
  definePortableTextField,
  imageWithAltField,
} from "@workspace/sanity-blocks/internal/schema-fields";
import { defineField, defineType } from "sanity";

export const imageTextSchema = defineType({
  name: "imageText",
  title: "Image & Text",
  type: "object",
  icon: ImagesIcon,
  fields: [
    imageWithAltField({
      description:
        "The image beside the text. Add alt text and use the hotspot to choose the focus when cropped.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagePosition",
      title: "Desktop Image Position",
      type: "string",
      description:
        "Choose which side the image appears on larger screens. On mobile, the image always appears above the text.",
      initialValue: "left",
      options: {
        layout: "radio",
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Optional short text above the heading.",
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description: "The heading beside the image.",
    }),
    definePortableTextField(["block"], {
      name: "richText",
      description:
        "The text beside the image. Add paragraphs, lists, or links.",
    }),
    buttonsField,
  ],
  preview: {
    select: { title: "title", media: "image", imagePosition: "imagePosition" },
    prepare: ({ title, media, imagePosition }) => ({
      title: title || "Image & Text",
      subtitle: `Image & Text · Image ${imagePosition === "right" ? "right" : "left"}`,
      media: media ?? ImagesIcon,
    }),
  },
});
