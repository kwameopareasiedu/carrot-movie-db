import "./app.scss";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app.tsx";
import { MantineProvider } from "@mantine/core";
import defaultTheme from "@/config/theme.ts";
import { QueryClientProvider } from "react-query";
import queryClient from "@/config/query.ts";
import { Notifications } from "@mantine/notifications";

// Entry point of the app
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={defaultTheme} withGlobalStyles>
      <BrowserRouter basename="/carrot-movie-db">
        <Notifications />
        <App />
      </BrowserRouter>
    </MantineProvider>
  </QueryClientProvider>
);
