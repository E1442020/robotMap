import { Badge, Button, Flex, Title } from "@mantine/core";
import useIsMobile from "../../hooks/use-is-mobile";
import { useState } from "react";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Setting from "./Setting";

export default function RobotSetting() {
  const mobile = useIsMobile();
  const [status, setStatus] = useState<any>("active");
  return (
    <>
      <Flex
        bg="gray.1"
        p="sm"
        mb="sm"
        justify="space-between"
        direction={mobile ? "column" : "row"}
        gap="sm"
      >
        <Flex align="center" gap="md" w={mobile ? "100%" : undefined}>
          <Title order={4} c="gray.7">
            Robot X
          </Title>
          {status == "active" ? (
            <Badge variant="light" color="green">
              Active
            </Badge>
          ) : status === "pause" ? (
            <Badge variant="light" color="blue">
              pause
            </Badge>
          ) : (
            <Badge variant="light" color="red">
              Off
            </Badge>
          )}
        </Flex>
        <Flex align="center" gap="md" w={mobile ? "100%" : undefined}>
          {status !== "off" && (
            <Button
              size="xs"
              color="red"
              variant="light"
              onClick={() => setStatus("off")}
            >
              Force Stop
            </Button>
          )}
          {status === "pause" && (
            <Button
              rightSection={<IconPlayerPlay size="1rem" />}
              size="xs"
              color="green"
              variant="light"
              onClick={() => setStatus("active")}
            >
              Continue
            </Button>
          )}
          {status === "active" && (
            <Button
              rightSection={<IconPlayerPause size="1rem" />}
              size="xs"
              color="blue"
              variant="light"
              onClick={() => setStatus("pause")}
            >
              Pause
            </Button>
          )}
          {status !== "off" && <Setting />}
        </Flex>
      </Flex>
    </>
  );
}
