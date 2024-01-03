import {
  Group,
  Button,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Title,
} from "@mantine/core";

import classes from "./header.module.scss";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { close, open } from "./slice/menuSlice";

export default function Header() {
  const opened = useSelector((state: RootState) => state.menu.status);

  const dispatch = useDispatch();
  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Title order={4}>Logo</Title>

          <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger
            opened={opened}
            onClick={() => dispatch(open())}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={opened}
        onClose={() => dispatch(close())}
        size="md"
        title={<Title order={4}>Logo</Title>}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Sidebar />
          <Divider my="sm" />

          <Group justify="center" grow mb="3rem" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
