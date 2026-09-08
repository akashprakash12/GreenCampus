import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import EcoShowcase from "@/components/EcoShowcase";
import Statistics from "@/components/Statistics";
import Initiatives from "@/components/Initiatives";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <EcoShowcase />
      <Statistics />
      <Initiatives />
      <Events />
      <Gallery />
      <Contact />
    </main>
  );
}