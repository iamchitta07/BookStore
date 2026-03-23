import { useState } from "react";
import ProductCard from "../common/bookCard/ProductCard";
import ProductCard2 from "../common/bookCard/ProductCard2";
import UnderNav from "../layouts/underNav/UnderNav";
import IMG from "/images/Product.webp";
const LandingPage = () => {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const onWhishlisted = () => {
    setIsWishlisted(prev=>!prev);
  }

  return (
    <div>
      <UnderNav />
      <div className="flex flex-wrap gap-5 p-10">
        <ProductCard
          imageUrl={IMG}
          title="The Great Gatsby"
          rating={4.5}
          totalReviews={12345}
          author="F. Scott Fitzgerald"
          originalPrice={15}
          off={33}
          isWishlisted={isWishlisted}
          onWishlistClick={onWhishlisted}
          onAddToCart={() => {}}
          onBuyNow={() => {}}
        />
        <ProductCard2
          imageUrl={IMG}
          title="Beauty and The Beast"
          rating={4.5}
          totalReviews={1045}
          author="Gabrielle-Suzanne Barbot de Villeneuve"
          originalPrice={1500}
          off={40}
          isWishlisted={isWishlisted}
          onWishlistClick={onWhishlisted}
          onAddToCart={() => {}}
          onBuyNow={() => {}}
          stockLeft={100}
        />
      </div>
    </div>
  );
};

export default LandingPage;
