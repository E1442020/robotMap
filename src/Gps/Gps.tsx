import { Flex } from "@mantine/core";
import MessageFromRobot from "../designSystem/components/MessageFromRobot";
import RobotSetting from "../designSystem/components/RobotSetting";
import useIsMobile from "../designSystem/hooks/use-is-mobile";
import DynamicBatteryChart from "./components/DynamicBatteryChart";
import DynamicDirectionChart from "./components/DynamicDirectionChart";
import DynamicSealantChart from "./components/DynamicSealantChart";
import DynamicRotationChart from "./components/DynamicRotationChart";
import DynamicRobotTempChart from "./components/DynamicRobotTempChart";
import DynamicSealantTempChart from "./components/DynamicSealantTempChart";
import Drawing from "./components/Drawing";
import DynamicRobotSpeedChart from "./components/DynamicRobotSpeedChart";

export default function Gps() {
  const mobile = useIsMobile();
  return (
    <>
      <RobotSetting />
      <MessageFromRobot />
      <Drawing />
      <Flex
        justify="space-between"
        direction={mobile ? "column" : "row"}
        gap="md"
        my="md"
      >
        <DynamicDirectionChart />
        <DynamicRotationChart />
      </Flex>
      <Flex
        justify="space-between"
        direction={mobile ? "column" : "row"}
        gap="md"
        my="md"
      >
        <DynamicRobotTempChart />
        <DynamicSealantTempChart />
      </Flex>
      <Flex
        justify="space-between"
        direction={mobile ? "column" : "row"}
        gap="md"
        my="md"
      >
        <DynamicSealantChart />
        <DynamicBatteryChart />
        <DynamicRobotSpeedChart />
      </Flex>
    </>
  );
}
