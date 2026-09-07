import { definePortableTextField } from "./sanity-rich-text";

test("rich-text images register an editor preview that observes layout and size", () => {
  const field = definePortableTextField(["image"]);
  const image = field.of?.find((member) => member.name === "image");

  if (!image || !("components" in image) || !("preview" in image)) {
    throw new Error("Rich-text image has no custom Studio preview");
  }
  expect(image.components?.preview).toBeTypeOf("function");
  expect(image.preview?.select).toMatchObject({
    imageLayout: "layout",
    imageSize: "size",
    asset: "asset",
    crop: "crop",
    hotspot: "hotspot",
  });
});
