import { type FC, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

interface StockMonitoringProps {
  data: { id: number; title: string; stock_quantity: number }[];
}

const StockMonitoring: FC<StockMonitoringProps> = ({ data }) => {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleEditClick = async (id: number) => {
    try {
      setLoadingId(id);
      const { data: bookData } = await api.get(`/books/${id}`);
      navigate("/add-product", { state: { editBook: bookData } });
    } catch (err) {
      console.error("Failed to fetch book details", err);
    } finally {
      setLoadingId(null);
    }
  };
  return (
    <div className="w-full border-4 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-1.5 duration-200  min-h-80 bg-white">
      <div className="w-full border-b-4 bg-col-three h-20 font-bold flex items-center pl-10 gap-5">
        <IoWarningOutline color="white" size={40} />
        <h1 className="uppercase text-white text-4xl">Low Stock Monitor</h1>
      </div>
      <div className="min-h-60 pt-10 flex flex-col items-center">
        <h1
          className={` text-center my-5 uppercase text-3xl font-bold ${data.length === 0 ? "text-black" : "text-col-three"}`}
        >
          <span className="text-6xl">{data.length}</span>
          <br />
          items below
          <br /> threshold
        </h1>
        {data.length !== 0 && <div className="h-1 w-[80%] bg-black my-2"></div>}
        {data.length !== 0 && (
          <div className="w-[80%] pt-2 pb-4 mb-5">
            {data.map((ele) => (
              <button
                key={ele.id}
                onClick={() => handleEditClick(ele.id)}
                disabled={loadingId === ele.id}
                className="w-full cursor-pointer border-2 border-col-three py-3 px-5 mb-2 flex justify-between shadow-[3px_3px_0px_#FD5A46] hover:shadow-none hover:translate-0.75 duration-200 disabled:opacity-60 disabled:cursor-wait"
              >
                <div className="flex gap-5">
                  <FaBook color="#000" size={30} />
                  <h1 className="text-black font-bold text-2xl">{ele.title}</h1>
                </div>
                <h1 className="text-2xl font-bold">
                  {loadingId === ele.id
                    ? <span className="text-col-three italic">Loading…</span>
                    : <><span>Stock Left: </span><span className="text-col-three">{ele.stock_quantity}</span></>}
                </h1>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockMonitoring;
