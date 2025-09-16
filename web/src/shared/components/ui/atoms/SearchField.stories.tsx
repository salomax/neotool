import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "../molecules/SearchField";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

const meta: Meta = { title: "UI/Molecules/SearchField" };
export default meta;
type Story = StoryObj;

function SearchFieldDemo() {
  const [v, setV] = useState("");
  const [last, setLast] = useState("");
  return (
    <Stack spacing={1} sx={{ width: 420 }}>
      <Typography variant="overline">
        Type to search (press `/` to focus)
      </Typography>
      <SearchField
        value={v}
        onChange={setV}
        onSearch={setLast}
        placeholder="Search users..."
      />
      <Typography variant="caption">Debounced: {last || "—"}</Typography>
    </Stack>
  );
}

export const Playground: Story = {
  render: () => <SearchFieldDemo />,
};
