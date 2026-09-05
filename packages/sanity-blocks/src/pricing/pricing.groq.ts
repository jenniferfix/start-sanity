import { buttonsFragment } from "../internal/groq-fragments";

export const pricingGroqProjection = /* groq */ `
  _type == "pricing" => {
    ...,
    plans[]{
      ...,
      ${buttonsFragment}
    }
  }
`;
