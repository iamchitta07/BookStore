import { useEffect, useState } from "react";
import VendorCard from "../common/vendorCard/VendorCard";
import type { VendorProps } from "../../types";
import api from "../../services/axios";

interface TopVendorApiResponse {
  admin_id: number;
  username: string;
  total_books_sold: number;
}

const TopVendors = () => {
  const [vendors, setVendors] = useState<VendorProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopVendors = async () => {
      try {
        setLoading(true);
        const response = await api.get<TopVendorApiResponse[]>("/sales/top-vendors", {
          params: { limit: 5 },
        });

        // Rank is determined by descending sort order from the API — assign 1..5
        const ranked: VendorProps[] = response.data.map((vendor, index) => ({
          username: vendor.username,
          sold: vendor.total_books_sold,
          rank: index + 1,
        }));

        setVendors(ranked);
      } catch (err) {
        setError("Failed to load vendors.");
        console.error("Error fetching top vendors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopVendors();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold uppercase mb-5">Top Selling Vendors</h1>

      {loading && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-30 border rounded-lg animate-pulse bg-gray-100" />
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-40 text-col-three font-bold">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-2">
          {vendors.map((item) => (
            <VendorCard key={item.username} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopVendors;
