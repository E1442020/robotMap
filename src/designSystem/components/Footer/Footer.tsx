import { Box, Title } from "@mantine/core";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";

export default function Footer() {
  const color = usePrimaryColorHex();
  return (
    <>
      <Box mt="auto" bg={color}>
        <Title order={4} ta="center">
          Footer
        </Title>
      </Box>
    </>
  );
}
