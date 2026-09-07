import type { PreviewProps } from "sanity";

interface RichTextImagePreviewProps extends PreviewProps {
  imageSource?: PreviewProps["media"];
  imageLayout?: unknown;
  imageSize?: unknown;
}

const sizeWidths = {
  small: "33.333333%",
  medium: "50%",
  large: "66.666667%",
};

const sizeLabels = {
  small: "One-third width",
  medium: "Half width",
  large: "Two-thirds width",
};

const layoutLabels = {
  full: "Full width · No wrapping",
  center: "Centered · No wrapping",
  left: "Float left · Text wraps on the right",
  right: "Float right · Text wraps on the left",
};

export function RichTextImagePreview(props: RichTextImagePreviewProps) {
  const previewProps = { ...props, media: props.imageSource ?? props.media };
  // Keep list/search previews in their native layout. The proportions here
  // represent the website's desktop layout, even in a narrow editor pane.
  if (props.layout !== "block" && props.layout !== "blockImage") {
    return props.renderDefault(previewProps);
  }

  const layout =
    props.imageLayout === "left" ||
    props.imageLayout === "right" ||
    props.imageLayout === "center"
      ? props.imageLayout
      : "full";
  const size =
    props.imageSize === "small" || props.imageSize === "large"
      ? props.imageSize
      : "medium";

  return (
    <div>
      <div
        style={{
          width: layout === "full" ? "100%" : sizeWidths[size],
          marginLeft: layout === "right" || layout === "center" ? "auto" : 0,
          marginRight: layout === "center" ? "auto" : 0,
        }}
      >
        {props.renderDefault(previewProps)}
      </div>
      <div style={{ padding: "8px 12px", fontSize: 12, lineHeight: 1.5 }}>
        {layoutLabels[layout]}
        {layout !== "full" ? ` · ${sizeLabels[size]}` : ""}
      </div>
    </div>
  );
}
