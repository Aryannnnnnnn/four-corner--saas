"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LocalArea {
  id: number;
  title: string;
  description: string;
  image: string;
}

const CaseStudiesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Framer Motion variants - matching exact CSS animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const slideDown = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "4rem" }
  };

  const localAreas: LocalArea[] = [
    {
      id: 1,
      title: "Arlington",
      description: "Located north of Shaftsbury, Arlington sits between the Green Mountains and Taconic Range. The Battenkill River runs through the center of town, making it a great spot for trout fishing.",
      image: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760194633/arlington_kvwmng.png",
    },
    {
      id: 2,
      title: "Bennington",
      description: "Bennington has a historic downtown with beautiful architecture and many popular shops and restaurants. A stroll down Main Street quickly shows all the charm Bennington has to offer.",
      image: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760194329/bennington_ecioxh.jpg",
    },
    {
      id: 3,
      title: "North Bennington",
      description: "Northwest of Bennington and east of Hoosick Falls, NY, North Bennington is noted for arts and one of the few local lakes. Also home of the annual Halloween Parade!",
      image: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760194633/north_begginton_eymkhd.png",
    },
    {
      id: 4,
      title: "Pownal",
      description: "Considered the gateway to Vermont, Pownal is just north of the Massachusetts border and is surrounded with mountains. Also in the Green Mountain National Forest is an entrance to the Long Trail.",
      image: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760194632/pownal_whmgmv.png",
    },
    {
      id: 5,
      title: "Shaftsbury",
      description: "Home to the popular Lake Shaftsbury State Park! Beach, play, and picnic areas are ready to be enjoyed and explored. The park occupies over 80 acres!",
      image: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760194632/shaftbury_whm8mb.png",
    },
  ];

  // Use local areas data
  const displayData = localAreas;

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [displayData.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayData.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + displayData.length) % displayData.length,
    );
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Decorative Line */}
          <motion.div
            className="w-px h-16 bg-[#21266c] mx-auto mb-8"
            variants={slideDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          ></motion.div>

          <motion.h2
            className="text-[#21266c] text-4xl sm:text-5xl lg:text-6xl font-light mb-6"
            style={{ fontFamily: "Coconat" }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
          >
            Our Local Expertise
          </motion.h2>
        </div>

        {/* Main Image Showcase */}
        <div className="relative mb-16">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative h-[500px] lg:h-[600px]">
              {displayData[activeIndex] && (
                <>
                  <img
                    src={displayData[activeIndex].image}
                    alt={displayData[activeIndex].title}
                    className="w-full h-full object-cover transition-all duration-700"
                    key={activeIndex}
                  />
                  {/* Black Overlay */}
                  <div className="absolute inset-0 bg-black/30"></div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-16 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                    <div className="max-w-3xl">
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-2 sm:mb-4 text-white/70">
                        Vermont
                      </p>
                      <h3
                        className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-3 sm:mb-6"
                        style={{ fontFamily: "Coconat" }}
                      >
                        {displayData[activeIndex].title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {displayData[activeIndex].description}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 right-2 sm:right-4 flex justify-between pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 pointer-events-auto shadow-lg"
                  aria-label="Previous case study"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#21266c]" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 pointer-events-auto shadow-lg"
                  aria-label="Next case study"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#21266c]" />
                </button>
              </div>

              {/* Pagination */}
              <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 flex items-center gap-2 sm:gap-4 text-white">
                <div className="w-8 sm:w-12 h-px bg-white/50"></div>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {activeIndex + 1} / {displayData.length}
                </span>
                <div className="w-8 sm:w-12 h-px bg-white/50"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <div className="rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
            {/* Card 1 */}
            <motion.div
              className="p-8 lg:p-10 text-center group hover:bg-black/5 transition-all duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.8 }}
            >
              <h3
                className="text-black text-2xl lg:text-3xl font-light mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                View More Information About Vermont
              </h3>
              <p className="text-black/70 text-sm mb-6 leading-relaxed">
                Get latest market insights and trends across Vermont's finest communities
              </p>
              <button
              onClick={() => window.location.href = "/about"}
              className="inline-flex items-center gap-2 text-black font-medium text-sm border-b-2 border-black/30 pb-1 hover:border-black hover:gap-4 transition-all duration-300">
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="p-8 lg:p-10 text-center group hover:bg-black/5 transition-all duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.0 }}
            >
              <h3
                className="text-black text-2xl lg:text-3xl font-light mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                Meet Our Team Of Experts
              </h3>
              <p className="text-black/70 text-sm mb-6 leading-relaxed">
                Find the right advisor to help guide your real estate journey
              </p>
              <button
                onClick={() => window.location.href = "/about"}
                className="inline-flex items-center gap-2 text-black font-medium text-sm border-b-2 border-black/30 pb-1 hover:border-black hover:gap-4 transition-all duration-300"
              >
                <span>MEET THE TEAM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="p-8 lg:p-10 text-center group hover:bg-black/5 transition-all duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.2 }}
            >
              <h3
                className="text-black text-2xl lg:text-3xl font-light mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                View Properties In Vermont
              </h3>
              <p className="text-black/70 text-sm mb-6 leading-relaxed">
                Find homes in these popular local areas across Vermont
              </p>
              <button
                onClick={() => window.location.href = "/listings"}
                className="inline-flex items-center gap-2 text-black font-medium text-sm border-b-2 border-black/30 pb-1 hover:border-black hover:gap-4 transition-all duration-300"
              >
                <span>EXPLORE PROPERTIES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
