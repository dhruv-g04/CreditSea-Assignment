import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import User from "./Pages/User";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import AdminDashboard from "./Pages/AdminDashboard";
import VerifierDashboard from "./Pages/VerifierDashboard";

// Add type for children
type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Conditionally hide Navbar and Sidebar for "/user" route
  const hideNavbarSidebar = location.pathname === "/user";

  return (
    <div className="app min-h-screen flex flex-col">
      {/* Navbar covers the full width in the first row, and it's fixed at the top */}
      {!hideNavbarSidebar && (
        <div className="w-full fixed top-0 z-[100]">
          <Navbar />
        </div>
      )}

      {/* Second row: Sidebar (1 column) and content (rest of the space) */}
      <div className="flex flex-1 mt-[4rem]"> {/* Add margin to account for fixed navbar */}
        {!hideNavbarSidebar && (
          <div className="w-64"> {/* Sidebar width is set to 16rem (64 = 16 * 4px) */}
            <Sidebar />
          </div>
        )}
        <div className="flex-1 p-6">{children}</div> {/* Content takes remaining space */}
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/user" element={<User />} />
		      <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/verifier" element={<VerifierDashboard/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}
export const backendAPI: string = process.env.REACT_BACKEND_URL || "http://localhost:4500"; // Default API URL
export default App;
