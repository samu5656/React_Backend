import ScrollProgress from "./components/ScrollProgress.jsx";
import Nav from "./sections/Nav.jsx";
import Hero from "./sections/Hero.jsx";
import Mission from "./sections/Mission.jsx";
import ProductCutaway from "./sections/ProductCutaway.jsx";
import Engineering from "./sections/Engineering.jsx";
import SpecStrip from "./sections/SpecStrip.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import FieldGallery from "./sections/FieldGallery.jsx";
import Solutions from "./sections/Solutions.jsx";
import Team from "./sections/Team.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="top">
        <Hero />
        <Mission />
        <ProductCutaway />
        <Engineering />
        <SpecStrip />
        <HowItWorks />
        <FieldGallery />
        <Solutions />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
