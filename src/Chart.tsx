import "chart.js/auto";
import { useEffect, useState } from "react";
import moment from "moment";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Chart() {
  const [numberXArray, setNumberXArray] = useState<any>([]);
  const [numberYArray, setNumberYArray] = useState<any>([]);
  const [current, setCurrent] = useState<any>(moment());

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
      <div
        style={{
          width: "70%",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div>
            <h2>Live Direction x , y</h2>
            <Line data={data} />
          </div>
          <div>
            <h2>
              The number of hours consumed by the robot during the days of the
              week.
            </h2>
            <Bar
              data={{
                labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],

                datasets: [
                  {
                    label: "Hours",
                    data: [33, 53, 85, 41, 44, 65, 58],
                    backgroundColor: "#7077A1",
                  },
                ],
              }}
            />
          </div>
          <div>
            <h2>
              The amount of liquid consumed by the robot in the last 3 days
            </h2>
            <div
              style={{
                height: "300px",
              }}
            >
              <Doughnut
                style={{
                  margin: "0 auto",
                }}
                data={{
                  labels: ["Sat", "Sun", "Mon"],

                  datasets: [
                    {
                      label: "Amount",
                      data: [33, 53, 85],
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div>
            <h2>
              The number of locations visited by the robot in the last 4 weeks.
            </h2>
            <Line
              data={{
                labels: [
                  "First Week",
                  "Second Week",
                  "Third Week",
                  "Fourth Week",
                ],

                datasets: [
                  {
                    label: "Locations",
                    data: [20, 53, 10, 30],
                    fill: false,
                    backgroundColor: "#4F6F52",
                    borderColor: "#4F6F52",
                  },
                  {
                    label: "Locations",
                    data: [10, 56, 7, 56],
                    fill: false,
                    backgroundColor: "#5D3587",
                    borderColor: "#5D3587",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
