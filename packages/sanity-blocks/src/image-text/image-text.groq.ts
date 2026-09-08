import {
  buttonsFragment,
  imageFragment,
  richTextFragment,
} from "../internal/groq-fragments";

export const imageTextGroqProjection = /* groq */ `
  _type == "imageText" => {
    ...,
    ${imageFragment},
    ${richTextFragment},
    ${buttonsFragment}
  }
`;
