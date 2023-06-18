import "./app.scss";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app.tsx";
import { MantineProvider } from "@mantine/core";
import defaultTheme from "@/config/theme.ts";
import { QueryClientProvider } from "react-query";
import queryClient from "@/config/query.ts";

// Entry point of the app
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={defaultTheme} withGlobalStyles>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </QueryClientProvider>
);
