import PopularBooks from "./PopularBooks";
import TrendingBooks from "./TrendingBooks";

const TrendingCollections = () => {
  return (
    <div className="grid grid-cols-[20%_80%] px-20">
      <TrendingBooks />
      <PopularBooks />
    </div>
  );
};

export default TrendingCollections;
