import { trendingBooks } from "../../../constants";
import type { ButtonProps } from "../../../types";
import Capsul from "../../common/buttons/Capsul";
import BookCard from "../../common/trendingBookCard/BookCard";
import { FaChevronRight } from "react-icons/fa";

const capsulText: ButtonProps = {
  text: "View More",
  href: "trending",
  icon: <FaChevronRight />,
  color: "text-black",
  bgColor: "bg-col-seven",
};

const TrendingBooks = () => {
  return (
    <div className="flex flex-col gap-3 items-start">
      <div className="flex w-88 justify-between items-end">
        <h1 className="text-2xl font-bold self-end">Trending Books:</h1>{" "}
        <Capsul {...capsulText} />{" "}
      </div>
      <>
        {trendingBooks.map((ele, idx) => (
          <BookCard key={idx} {...ele} />
        ))}
      </>
    </div>
  );
};

export default TrendingBooks;
