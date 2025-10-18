import CuratedListings from "@/components/home/CuratedListings";
import RedefiningRealEstateSection from "@/components/home/RedefiningRealEstateSection";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/heroSection";
import VermontStorySection from "@/components/home/VermontStorySection";
import Footer from "@/components/layout/Footer";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import HomeBuyingGuideSection from "@/components/home/HomeBuyingGuideSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CuratedListings />
      <ExpertiseSection />
      <CaseStudiesSection />
      <RedefiningRealEstateSection />
      <VermontStorySection />
      <HomeBuyingGuideSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Home;
