const CarouselOne = () => {
    return (
        <div className="h-screen w-screen bg-">
            <img src="/images/Carousel.webp" alt="Carousel" className="w-full h-full object-cover" />
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full">Shop Now</button>
        </div>
    );
};

export default CarouselOne;