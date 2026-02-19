import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
// import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/Lost";
import ReportFound from "./pages/Found";
import LostItemsPage from "./pages/LostItemsPage";
import FoundItemsPage from "./pages/FoundItemsPage";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import GoogleSuccess from "./pages/GoogleSuccess";
import LoginSuccess from "./pages/LoginSuccess";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/login-success" element={<LoginSuccess />} />

          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Lost" element={<ReportLost />} />
          <Route path="/Found" element={<ReportFound />} />
          <Route path="/lost-items" element={<LostItemsPage />} />
          <Route path="/found-items" element={<FoundItemsPage />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
<Route path="/google-success" element={<GoogleSuccess />} />
 <Analytics />
          {/* <Route path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              } /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
