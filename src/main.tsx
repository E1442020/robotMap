import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import { allRouters } from "./router.tsx";
import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
} from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store.ts";

const router = allRouters;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ColorSchemeScript forceColorScheme="light" />
      <DirectionProvider>
        <MantineProvider
          theme={{
            primaryColor: "light-blue",
            colors: {
              "light-blue": [
                "#e5faff",
                "#d0f1ff",
                "#a0e1fd",
                "#6ed1fc",
                "#4bc4fa",
                "#38bbfa",
                "#2bb7fb",
                "#1ca1e1",
                "#008fc9",
                "#007cb2",
              ],
            },
          }}
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </DirectionProvider>
    </Provider>
  </>
);
