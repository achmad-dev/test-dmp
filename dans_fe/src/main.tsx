import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import routes from "./usecase/useRouter.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import "./index.css";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
const QueryClientInstance = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={QueryClientInstance}>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>
);
