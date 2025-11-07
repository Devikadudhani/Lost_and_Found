import React from "react";
import Hero from "../sections/home/Hero";
import RecentGallery from "../components/RecentGallery";

function Home() {
  return (
    <div className="pt-4">
      <Hero />
      <RecentGallery />
    </div>
  );
}

export default Home;
