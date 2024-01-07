import { Box, Flex, Title } from "@mantine/core";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import { IconRobot } from "@tabler/icons-react";

export default function Footer() {
  const color = usePrimaryColorHex();
  return (
    <>
      <Box mt="auto" bg="gray.4" py="sm">
        <Flex align="center" c={color} justify="center">
          <IconRobot />
          <Title order={4}> Robot</Title>
        </Flex>
      </Box>
    </>
  );
}
