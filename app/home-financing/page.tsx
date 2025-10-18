import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeFinancingHero from "@/components/home-financing/HomeFinancingHero";
import FinancingStepsSection from "@/components/home-financing/FinancingStepsSection";

const HomeFinancing = () => {
  return (
    <>
      <Header />
      <HomeFinancingHero />
      <FinancingStepsSection />
      <Footer />
    </>
  );
};

export default HomeFinancing;
