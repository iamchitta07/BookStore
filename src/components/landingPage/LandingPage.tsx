import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { fetchBestDeals } from "../../features/books/booksSlice";
import { fetchShopCounts } from "../../features/shop/shopSlice";

import UnderNav from "../layouts/underNav/UnderNav";
import CenterCarousel from "../carousel/CenterCarousel";
import Accordino from "../layouts/accordino/Accordino";
import FirstCarousel from "../carousel/FirstCarousel";
import CurrentTrend from "./CurrentTrend";
import TrendingCollections from "./TrendingCollections";
import Category from "./Category";

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch common landing page data once
    dispatch(fetchBestDeals());
    dispatch(fetchShopCounts());
  }, [dispatch]);

  return (
    <div>
      <UnderNav />
      <FirstCarousel />
      <CurrentTrend />
      <Accordino />
      <TrendingCollections />
      <CenterCarousel />
      <Category />
    </div>
  );
};

export default LandingPage;
