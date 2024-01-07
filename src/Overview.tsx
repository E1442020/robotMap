import { Box, Title } from "@mantine/core";
import "chart.js/auto";

import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Overview() {
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
            gap: "3rem",
          }}
        >
          <Box>
            <Title order={4} c="gray.7">
              The number of hours consumed by the robot during the days of the
              week.
            </Title>
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
          </Box>
          <Box>
            <Title order={4} c="gray.7">
              The amount of sealant consumed by the robot in the last 3 days
            </Title>
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
          </Box>
          <Box>
            <Title order={4} c="gray.7">
              The number of locations visited by the robot in the last 4 weeks.
            </Title>
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
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    backgroundColor: "#4F6F52",
                    borderColor: "#4F6F52",
                  },
                  {
                    label: "Locations",
                    data: [10, 56, 7, 56],
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "#5D3587",
                    borderColor: "#5D3587",
                  },
                ],
              }}
            />
          </Box>
        </div>
      </div>
    </>
  );
}
