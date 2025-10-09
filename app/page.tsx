import CuratedListings from "@/components/home/CuratedListings";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/heroSection";
import PropertyCarousel from "@/components/home/PropertyCarousel";
import VermontStorySection from "@/components/home/VermontStorySection";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <PropertyCarousel />
      <ExpertiseSection />
      <CuratedListings />
      <FAQSection />
      <VermontStorySection />
      <Footer />
    </>
  );
};

export default Home;
