import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeFinancingHero from "@/components/home-financing/HomeFinancingHero";
import FinancingStepsSection from "@/components/home-financing/FinancingStepsSection";
import FinancingCTA from "@/components/home-financing/FinancingCTA";
import VideoDropdownSection from "@/components/home/VideoDropdownSection";

const Financing = () => {
  return (
    <>
      <Header />
      <HomeFinancingHero />
      <FinancingStepsSection />
      <VideoDropdownSection />
      <FinancingCTA />
      <Footer />
    </>
  );
};

export default Financing;
