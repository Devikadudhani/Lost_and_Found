import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/Lost";
import ReportFound from "./pages/Found";


export default function App() {
   const isAuthenticated = !!localStorage.getItem("token");
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path = "/About" element={<About />} />
          <Route path = "/Lost" element={<ReportLost />} />
          <Route path = "/Found" element={<ReportFound />} />
          <Route path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
