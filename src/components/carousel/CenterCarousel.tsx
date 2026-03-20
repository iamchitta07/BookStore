import { useState, useEffect, useCallback, type ReactNode } from "react";

interface CenterCarouselProps {
  children?: ReactNode[];
  interval?: number;
}

const CenterCarousel = ({
  children,
  interval = 3000,
}: CenterCarouselProps) => {
  const slides = children ?? [];
  const totalSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Auto-advance every `interval` ms
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [goToNext, interval, totalSlides]);

  // When we land on the cloned first slide, snap back to real first slide
  useEffect(() => {
    if (currentIndex === totalSlides) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); // wait for transition to finish
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalSlides]);

  if (totalSlides === 0) return null;

  // Clone first slide at end for seamless looping
  const extendedSlides = [...slides, slides[0]];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Slide track */}
      <div
        className="flex h-full"
        style={{
          width: `${extendedSlides.length * 100}vw`,
          transform: `translateX(-${currentIndex * 100}vw)`,
          transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="w-screen h-screen flex-shrink-0"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex % totalSlides === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CenterCarousel;