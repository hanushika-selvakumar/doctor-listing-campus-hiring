import { Switch, Route, Link, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import IntegrationsPage from "@/pages/integrations";
import AnalyticsPage from "@/pages/analytics";
import ClientsPage from "@/pages/clients";
import {
  Stethoscope,
  Users,
  BarChart,
  Cog,
  Search
} from "lucide-react";

// Navigation component for the layout
function Navigation() {
  const [location] = useLocation();
  
  const navItems = [
    { path: "/", label: "Doctors", icon: <Stethoscope size={18} /> },
    { path: "/clients", label: "Clients", icon: <Users size={18} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart size={18} /> },
    { path: "/integrations", label: "Integrations", icon: <Cog size={18} /> },
  ];
  
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white shadow-sm">
              <Stethoscope className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold gradient-text">Doctor Finder</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  location === item.path
                    ? "text-primary bg-primary/5"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="md:hidden">
              <button
                className="p-1 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <button
              className="p-1 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/integrations" component={IntegrationsPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/clients" component={ClientsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Router />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
