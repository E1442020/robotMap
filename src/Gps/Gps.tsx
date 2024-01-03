import Drawing from "./components/Drawing";
import DynamicChart from "./components/DynamicChart";

export type GpsProps = {
  // props go here
};
export default function Gps(props: GpsProps) {
  return (
    <>
      <Drawing />
      <DynamicChart />
    </>
  );
}
