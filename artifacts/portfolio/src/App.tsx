import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParticleCanvas from "@/components/ParticleCanvas";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div style={{ background: "hsl(0 0% 2%)", minHeight: "100vh" }}>
          <ParticleCanvas />
          <Navbar />
          <main>
            <Home />
          </main>
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
