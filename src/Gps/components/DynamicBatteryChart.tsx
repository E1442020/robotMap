import { Flex, Title } from "@mantine/core";
import BatteryGauge from "react-battery-gauge";
import useIsMobile from "../../designSystem/hooks/use-is-mobile";
export default function DynamicBatteryChart() {
  const mobile = useIsMobile();

  return (
    <>
      <Flex direction="column" align="center" w={mobile ? "100%" : "33%"}>
        <Title my="sm" c="gray.7" order={4}>
          Battery Charge
        </Title>
        <BatteryGauge
          value={50}
          size={150}
          orientation="horizontal"
          customization={{
            batteryBody: {
              strokeColor: "#333",
              strokeWidth: 1,
              cornerRadius: 2,
            },
            batteryCap: {
              strokeColor: "#333",
              cornerRadius: 1,
              strokeWidth: 1,
              capToBodyRatio: 0.3,
            },
            batteryMeter: {
              outerGap: 0,
              gradFill: [
                { color: "red", offset: 0 },
                { color: "orange", offset: 40 },
                { color: "green", offset: 90 },
              ],
            },
            readingText: {
              lightContrastColor: "purple",
              darkContrastColor: "yellow",
              lowBatteryColor: "red",
              fontFamily: "Arial",
              fontSize: 12,
            },
          }}
        >
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
            </filter>
          </defs>
        </BatteryGauge>
      </Flex>
    </>
  );
}
