import { Box, Button, Flex, Text } from "@sanity/ui";
import { Autocomplete } from "@sanity/ui/autocomplete";
import { PhosphorIcon } from "@workspace/sanity-blocks/internal/phosphor-icon";
import { phosphorIconLoaders } from "@workspace/sanity-blocks/internal/phosphor-icon-loaders";
import { type StringInputProps, set, unset } from "sanity";

const options = Object.keys(phosphorIconLoaders).map((value) => ({ value }));

export function PhosphorIconInput({
  elementProps,
  onChange,
  readOnly,
  value,
}: StringInputProps) {
  return (
    <Flex align="center" gap={2}>
      {value && <PhosphorIcon aria-hidden="true" name={value} size={24} />}
      <Box flex={1}>
        <Autocomplete
          {...elementProps}
          filterOption={(query, option) =>
            option.value.includes(query.toLowerCase().replaceAll(" ", "-"))
          }
          onChange={(next) => onChange(next ? set(next) : unset())}
          openButton={!readOnly}
          options={options}
          placeholder="Search icons…"
          readOnly={readOnly}
          renderOption={(option) => (
            <Flex align="center" gap={3} padding={3}>
              <PhosphorIcon aria-hidden="true" name={option.value} size={24} />
              <Text size={1}>{option.value.replaceAll("-", " ")}</Text>
            </Flex>
          )}
          value={value ?? ""}
        />
      </Box>
      {value && !readOnly && (
        <Button mode="ghost" onClick={() => onChange(unset())} text="Clear" />
      )}
    </Flex>
  );
}
