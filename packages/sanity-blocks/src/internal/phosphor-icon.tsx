"use client";

import type { Icon, IconProps } from "@phosphor-icons/react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { type LazyExoticComponent, lazy, Suspense } from "react";

import { phosphorIconLoaders } from "./phosphor-icon-loaders";

const iconComponents = new Map<string, LazyExoticComponent<Icon>>();

export function PhosphorIcon({ name, ...props }: IconProps & { name: string }) {
  if (!Object.hasOwn(phosphorIconLoaders, name)) {
    return <WarningIcon {...props} />;
  }
  let Component = iconComponents.get(name);
  if (!Component) {
    Component = lazy(
      phosphorIconLoaders[name as keyof typeof phosphorIconLoaders]
    );
    iconComponents.set(name, Component);
  }
  return (
    <Suspense
      fallback={
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: props.size ?? "1em",
            height: props.size ?? "1em",
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
}
