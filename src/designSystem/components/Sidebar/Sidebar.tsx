import { ScrollArea, Flex, Avatar, Title } from "@mantine/core";
import { IconGauge, IconView360 } from "@tabler/icons-react";

import classes from "./sidebar.module.scss";
import { LinksGroup } from "./LinksGroup";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";

const mockdata = [
  { label: "Overview", icon: IconGauge, link: "/" },
  {
    label: "Live Tracking",
    icon: IconView360,
    links: [
      { label: "GPS Track", link: "/gps" },
      { label: "Camera Track", link: "/" },
      { label: "2D/3D Mapping Track", link: "/" },
    ],
  },
];

export default function Sidebar() {
  const color = usePrimaryColorHex(2);
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Flex align="center" gap=".3rem" bg={color}>
          <Avatar />
          <Title c="gray.9" order={5}>
            User
          </Title>
        </Flex>
      </div>
    </nav>
  );
}
