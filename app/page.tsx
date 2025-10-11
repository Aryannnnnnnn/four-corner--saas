import CuratedListings from "@/components/home/CuratedListings";
import RedefiningRealEstateSection from "@/components/home/RedefiningRealEstateSection";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/heroSection";
import VermontStorySection from "@/components/home/VermontStorySection";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CuratedListings />
      <RedefiningRealEstateSection />
      <VermontStorySection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Home;
