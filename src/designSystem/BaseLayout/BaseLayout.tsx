import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Flex } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import useIsMobile from "../hooks/use-is-mobile";
export default function BaseLayout() {
  const mobile = useIsMobile();

  return (
    <>
      <Flex direction="column" mih="100vh">
        <Header />
        <Flex pos="relative" justify="space-between">
          {!mobile && (
            <Box w="22%">
              <Sidebar />
            </Box>
          )}
          <Box w={mobile ? "100%" : "79%"} p="md">
            <Outlet />
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}
