import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { renderToReadableStream, renderToStaticMarkup } from "react-dom/server";

import { SanityIcon } from "./sanity-icon";

async function renderIcon(props: Parameters<typeof SanityIcon>[0]) {
  const stream = await renderToReadableStream(<SanityIcon {...props} />);
  await stream.allReady;
  return new Response(stream).text();
}

test("empty icon values render nothing", () => {
  expect(renderToStaticMarkup(<SanityIcon />)).toBe("");
  expect(renderToStaticMarkup(<SanityIcon icon="" />)).toBe("");
});

test("a selected Phosphor icon loads with its accessible label and sizing", async () => {
  const html = await renderIcon({
    icon: "check",
    alt: "Included",
    className: "size-6",
  });
  const expectedPath = renderToStaticMarkup(<CheckIcon />).match(
    /<path[^>]+>/
  )?.[0];
  expect(expectedPath).toBeDefined();
  expect(html).toContain(expectedPath);
  expect(html).toContain('aria-label="Included"');
  expect(html).toContain('role="img"');
  expect(html).toContain('width="24"');
  expect(html).toContain("size-6");
});

test.each(["not-an-icon", "constructor", "__proto__"])(
  "unknown icon %s preserves the fallback and accessibility",
  async (icon) => {
    const html = await renderIcon({ icon });
    const expectedPath = renderToStaticMarkup(<WarningIcon />).match(
      /<path[^>]+>/
    )?.[0];
    expect(expectedPath).toBeDefined();
    expect(html).toContain(expectedPath);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('role="img"');
  }
);
