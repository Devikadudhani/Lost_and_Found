import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/home/Hero";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <main className="flex-grow"></main> */}
      <Hero />
      {/* <Hero /> */}
      <Footer />
    </div>
  );
}
