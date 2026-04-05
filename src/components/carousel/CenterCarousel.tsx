import { useState, useEffect, useCallback } from "react";
import { centralCarousel } from "../../constants";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CarouselOne from "./CarouselOne";
import NavigateBtn from "./NavigateBtn";

const CenterCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === centralCarousel.length - 1 ? 0 : prev + 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? centralCarousel.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  if (centralCarousel.length === 0) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden bg-black group">
      {/* Slide track */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          width: `${centralCarousel.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / centralCarousel.length)}%)`,
        }}
      >
        {centralCarousel.map((slide, index) => (
          <CarouselOne key={index} {...slide} len={centralCarousel.length} />
        ))}
      </div>

      {/* Navigation Buttons */}
      <NavigateBtn onClickFn={goToPrev} className="left-2 md:left-8" aralLabel="Previous Slide">
        <FiChevronLeft size={56} strokeWidth={2.5} />
      </NavigateBtn>
      <NavigateBtn onClickFn={goToNext} className="right-2 md:right-8" aralLabel="Next Slide">
        <FiChevronRight size={56} strokeWidth={2.5} />
      </NavigateBtn>

      {/* Dot indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 md:gap-4 z-10 px-4">
        {centralCarousel.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 md:w-5 md:h-5 border-0.5 md:border-[3px] border-black transition-all duration-300 shadow-[2px_2px_0_rgba(0,0,0,1)] cursor-pointer ${
              currentIndex === index ? "bg-gray-600 scale-110" : "bg-white hover:bg-gray-200"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CenterCarousel;
