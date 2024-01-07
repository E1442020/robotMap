import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Modal,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { close, open } from "./slice/settingModalSlice";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
export default function Setting() {
  const dispatch = useDispatch();
  const opened = useSelector((state: RootState) => state.settingModal.status);
  const color = usePrimaryColorHex(6);
  const [speed, setSpeed] = useState(50);
  const formik = useFormik({
    initialValues: {
      speed: speed,
    },
    validationSchema: Yup.object({
      speed: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // resetForm();

      setSpeed(values.speed);
    },
  });

  return (
    <>
      <Tooltip label="Setting" color={color} withArrow>
        <ActionIcon onClick={() => dispatch(open())}>
          <IconSettings />
        </ActionIcon>
      </Tooltip>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={() => dispatch(close())}
      >
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap=".3rem">
            <label htmlFor="speed" style={{ color: color, fontWeight: "bold" }}>
              Speed
            </label>
            <TextInput
              id="speed"
              name="speed"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.speed}
            />
            {formik.touched.speed && formik.errors.speed ? (
              <Text c="red">{formik.errors.speed}</Text>
            ) : null}
          </Flex>
          <Flex direction="column" gap="sm" mt="md">
            <Flex wrap="wrap" c="green.6">
              <Box variant="light" bg="green.1" p=".2rem">
                The robot will stop and restart with any change made.
              </Box>
            </Flex>

            <Button
              variant="light"
              size="xs"
              type="submit"
              onClick={() => dispatch(close())}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}
