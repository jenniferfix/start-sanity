import {
  imageFields,
  markDefsFragment,
  richTextFragment,
} from "../internal/groq-fragments";

export const testimonialsGroqProjection = /* groq */ `
  _type == "testimonials" => {
    ...,
    ${richTextFragment},
    "testimonials": array::compact(testimonials[]{
      _key,
      authorName,
      authorRole,
      company,
      "quote": quote[]{
        ...,
        ${markDefsFragment}
      },
      "authorImage": authorImage{
        ${imageFields}
      }
    })
  }
`;
