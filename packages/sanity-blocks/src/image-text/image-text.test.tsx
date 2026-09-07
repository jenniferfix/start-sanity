import { renderToStaticMarkup } from "react-dom/server";
import { ImageText } from "./index";

test.each(["left", "right"])(
  "keeps the image before content for desktop position %s",
  (imagePosition) => {
    const html = renderToStaticMarkup(
      <ImageText
        image={{ id: "image-abc123-1200x900-jpg", alt: "A mountain" }}
        imagePosition={imagePosition}
        title="Explore"
        buttons={[{ text: "Learn more", href: "/explore" }]}
      />
    );
    expect(html).toContain('alt="A mountain"');
    expect(html.indexOf("<img")).toBeLessThan(html.indexOf("<h2"));
    expect(html).toContain("Learn more");
    expect(html.match(/<img /g)).toHaveLength(1);
    expect(html).not.toContain('id="image-text"');
  }
);

test("missing images still render the text without an empty image column", () => {
  const html = renderToStaticMarkup(
    <ImageText title="Draft content" imagePosition="right" />
  );
  expect(html).toContain("Draft content");
  expect(html).not.toContain("<img");
  expect(html).not.toContain("md:grid-cols-2");
});
