import { Box, Button, Group, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";

export default function ListMoviesPage() {
  const [searchParams, setSearchParams] = useState({
    key: ""
  });

  return (
    <div className="p-6 md:p-16 flex flex-col gap-4">
      <Group>
        <Box sx={{ flex: 1 }}>
          <Title size="h1" weight="bold" variant="gradient" gradient={{ from: "#EA371E", to: "#352C3A", deg: 90 }}>
            The Carrot Movie DB
          </Title>

          <Text italic>The only movie recommender you&apos;ll need</Text>
        </Box>

        <TextInput
          size="lg"
          radius={0}
          value={searchParams.key}
          placeholder="Search for movie..."
          onChange={e => setSearchParams({ ...searchParams, key: e.target.value })}
        />

        <Button color="blue" size="lg" radius={0} className="w-full lg:w-auto">
          Search
        </Button>
      </Group>

      <Text italic>Nothing to show</Text>
    </div>
  );
}
