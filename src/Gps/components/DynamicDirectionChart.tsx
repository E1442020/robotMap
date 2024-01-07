import { Box, Title } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useIsMobile from "../../designSystem/hooks/use-is-mobile";

export default function DynamicDirectionChart() {
  const [numberXArray, setNumberXArray] = useState<any>([]);
  const [numberYArray, setNumberYArray] = useState<any>([]);
  const [current, setCurrent] = useState<any>(moment());
  const mobile = useIsMobile();
  useEffect(() => {
    let countDown: number = 30;
    const interval = setInterval(() => {
      countDown--;

      if (countDown === 0) {
        setCurrent(moment());
        setNumberXArray([]);
        setNumberYArray([]);
      }

      const randomXNumber = Math.floor(Math.random() * 100) + 1;
      const randomYNumber = Math.floor(Math.random() * 100) + 1;
      setNumberXArray((prevArray: any) => [...prevArray, randomXNumber]);
      setNumberYArray((prevArray: any) => [...prevArray, randomYNumber]);
    }, 2000);

    return () => clearInterval(interval);
  }, [current]);
  const [timeArray, setTimeArray] = useState<any>([]);

  useEffect(() => {
    const end = moment().add(1, "minutes");
    const tempTimeArray = [];

    while (current <= end) {
      tempTimeArray.push(current.format("HH:mm:ss"));
      current.add(2, "s");
    }

    setTimeArray(tempTimeArray);
  }, [current]);

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: "Line 1",
        data: numberXArray,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Line 2",
        data: numberYArray,
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>
      <Box w={mobile ? "100%" : "49%"}>
        <Title order={5} c="gray.7">
          Live Direction x , y
        </Title>
        <Line data={data} />
      </Box>
    </>
  );
}
