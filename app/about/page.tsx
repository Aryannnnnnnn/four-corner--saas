import AboutHero from "@/components/about/AboutHero";
import BrandBenefitSection from "@/components/about/BrandBenefitSection";
import TeamSection from "@/components/about/TeamSection";
import CuratedListings from "@/components/home/CuratedListings";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

const About = () => {
  return (
    <>
      <Header />
      <AboutHero />
      <BrandBenefitSection />
      <TeamSection />
      <CuratedListings />
      <Footer />
    </>
  );
};

export default About;
