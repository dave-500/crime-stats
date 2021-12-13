import Container from "@mui/material/Container";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import useAxiosConfig from "./hooks/useAxiosConfig";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, refetchOnWindowFocus: false },
  },
});

function App() {
  useAxiosConfig();

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Home />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
