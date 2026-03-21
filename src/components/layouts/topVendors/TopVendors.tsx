import VendorCard from "../../common/vendorCard/VendorCard";
import { topVendor } from "../../../constants";

const TopVendors = () => {
  return (
    <div className="flex flex-col gap-2 items-start ml-200">
        <h1 className="text-2xl font-bold">Top Vendors of the Week:</h1>{" "}
      <>
        {topVendor.map((ele, idx) => (
          <VendorCard key={idx} {...ele} />
        ))}
      </>
    </div>
  );
};

export default TopVendors;
