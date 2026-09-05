import { cn } from "@workspace/tailwind-config/utils";
import type { ComponentProps } from "react";

import { PhosphorIcon } from "./phosphor-icon";

type IconProps = Omit<ComponentProps<"svg">, "src"> & {
  icon?: string | null;
  alt?: string;
};

const ICON_SIZE = 24;

export function SanityIcon({
  icon,
  className,
  alt,
  ...props
}: Readonly<IconProps>) {
  if (!icon) {
    return null;
  }

  return (
    <PhosphorIcon
      {...props}
      aria-hidden={alt ? undefined : true}
      aria-label={alt || undefined}
      role={alt ? "img" : undefined}
      className={cn("flex size-12 items-center justify-center", className)}
      name={icon}
      size={ICON_SIZE}
    />
  );
}
