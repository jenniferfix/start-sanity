import { renderToStaticMarkup } from "react-dom/server";

import { RichTextImagePreview } from "./rich-text-image-preview";

test.each([
  ["left", "small", "33.333333%", "0", "Text wraps on the right"],
  ["right", "large", "66.666667%", "auto", "Text wraps on the left"],
  ["center", "medium", "50%", "auto", "No wrapping"],
  [undefined, undefined, "100%", "0", "Full width"],
  ["unknown", "large", "100%", "0", "Full width"],
  ["left", "unknown", "50%", "0", "Half width"],
])(
  "previews %s / %s with the website's proportions",
  (layout, size, width, margin, label) => {
    const html = renderToStaticMarkup(
      <RichTextImagePreview
        layout="blockImage"
        imageLayout={layout}
        imageSize={size}
        renderDefault={() => <div>Native image preview</div>}
      />
    );

    expect(html).toContain(`width:${width}`);
    expect(html).toContain(`margin-left:${margin}`);
    expect(html).toContain(label);
    expect(html).toContain("Native image preview");
  }
);

test("preserves native list previews", () => {
  const html = renderToStaticMarkup(
    <RichTextImagePreview
      layout="default"
      imageLayout="right"
      imageSize="small"
      renderDefault={() => <div>Native list preview</div>}
    />
  );

  expect(html).toBe("<div>Native list preview</div>");
});

test("passes the image source and native editing actions to the default preview", () => {
  const imageSource = {
    _type: "image",
    asset: { _ref: "image-example-1200x800-jpg" },
    crop: { top: 0.1, bottom: 0, left: 0, right: 0 },
    hotspot: { x: 0.4, y: 0.5, width: 0.2, height: 0.2 },
  };
  const actions = <button type="button">Edit image</button>;
  const renderDefault = vi.fn(() => <div>Image</div>);

  renderToStaticMarkup(
    <RichTextImagePreview
      layout="blockImage"
      imageLayout="left"
      imageSource={imageSource}
      actions={actions}
      renderDefault={renderDefault}
    />
  );

  expect(renderDefault).toHaveBeenCalledWith(
    expect.objectContaining({
      media: imageSource,
      actions,
      layout: "blockImage",
    })
  );
});
