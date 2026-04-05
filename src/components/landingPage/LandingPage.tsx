import UnderNav from "../layouts/underNav/UnderNav";
import CenterCarousel from "../carousel/CenterCarousel";
import Accordino from "../layouts/accordino/Accordino";
import FirstCarousel from "../carousel/FirstCarousel";
import CurrentTrend from "./CurrentTrend";
const LandingPage = () => {


  return (
    <div>
      <UnderNav />
      <FirstCarousel />
      <CurrentTrend />
      <Accordino />
      <CenterCarousel />
    </div>
  );
};

export default LandingPage;
