import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetails from "@/pages/PropertyDetails";
import Guide from "@/pages/Guide";
import Activities from "@/pages/Activities";
import Events from "@/pages/Events";
import Guests from "@/pages/Guests";
import History from "@/pages/History";
import Location from "@/pages/Location";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/properties" component={Properties} />
        <Route path="/properties/:id" component={PropertyDetails} />
        <Route path="/guide" component={Guide} />
        <Route path="/activities" component={Activities} />
        <Route path="/events" component={Events} />
        <Route path="/guests" component={Guests} />
        <Route path="/history" component={History} />
        <Route path="/location" component={Location} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
