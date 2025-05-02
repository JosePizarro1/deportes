import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Deportes from "@/components/Deportes";
import CanchasDestacadas from "@/components/CanchasDestacadas";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Deportes />
      <CanchasDestacadas />
    </>
  );
}
