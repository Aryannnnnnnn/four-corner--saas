import CuratedListings from "@/components/home/CuratedListings";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/heroSection";
import VermontStorySection from "@/components/home/VermontStorySection";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CuratedListings />
      <ExpertiseSection />
      <VermontStorySection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Home;
