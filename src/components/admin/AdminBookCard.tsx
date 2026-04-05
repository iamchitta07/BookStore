import type { FC } from "react";

interface AdminBookCardProps {
  image: string;
  title: string;
  author: string;
  quantity: string;
  isbn: string;
}

const AdminBookCard: FC<AdminBookCardProps> = ({ image, title, author, quantity, isbn }) => {
  return (
    <div className="w-[95%] p-4 flex gap-5 bg-white mb-5 border-2 shadow-[4px_4px_0px_#000] hover:translate-1 hover:shadow-none duration-200">
      <div className="w-[15%]">
        <img className="border-2 shadow-[3px_3px_0px_#000] h-45" src={image} alt={title} />
      </div>
      <div className="w-[85%] h-full flex flex-col justify-start">
        <div className="uppercase w-30 flex font-bold items-center justify-center border-2 py-0.5 bg-col-two shadow-[2px_2px_0px_#FB7DA8] mb-2">
          Best Seller
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{title}</h1>
          <h1 className="text-lg">ISBN: {isbn}</h1>
          <h1 className="italic text-lg">{author}</h1>
          <h1 className="font-bold text-xl">
            Books Sold: <span className="text-col-five">{quantity}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminBookCard;
