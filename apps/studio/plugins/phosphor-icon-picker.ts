import { definePlugin, defineType } from "sanity";

import { PhosphorIconInput } from "@/components/phosphor-icon-input";

export const phosphorIconPicker = definePlugin({
  name: "phosphor-icon-picker",
  schema: {
    types: [
      defineType({
        name: "phosphor-icon",
        title: "Icon",
        description: "Choose an icon to represent this item.",
        type: "string",
        components: { input: PhosphorIconInput },
      }),
    ],
  },
});
