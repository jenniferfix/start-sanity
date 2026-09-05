import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";

import { PhosphorIcon } from "./phosphor-icon";

export const phosphorIconPreview = (icon?: string | null) =>
  icon ? <PhosphorIcon name={icon} size={24} /> : <WarningIcon size={24} />;
