import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";

import CustomerProf from "./CustomerProf";
import AdminBookCard from "./AdminBookCard";
import AdminSaleSts from "./AdminSaleSts";
import StockMonitoring from "./StockMonitoring";

import type { RootState, AppDispatch } from "../../app/store";
import { fetchAdminDashboard, fetchAdminBooks } from "../../features/admin/adminThunk";
import {formatUsNumber} from "../../utils";

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboard, books, dashboardLoading } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
    dispatch(fetchAdminBooks());
  }, [dispatch]);

  if (dashboardLoading || !dashboard) {
    return <div className="p-20 text-4xl font-bold">Loading dashboard...</div>;
  }

  const stockData = dashboard.alerts.low_stock_items || [];
  const topSeller = dashboard.advanced_analytics.top_selling_books || [];
  const topCust = dashboard.advanced_analytics.top_customers || [];
  const metrics = dashboard.metrics;

  return (
    <div className="px-20 py-10">
      {/* Title */}
      <h1 className="uppercase text-8xl font-bold">System Overview</h1>
      <h1 className="text-2xl mt-2">Real-time system inventory and sales synchronization.</h1>
      <div className="w-full h-1 bg-black my-10"></div>

      {/* DashBoard */}
      <AdminSaleSts 
        totalCustomer={metrics.total_customers} 
        totalBooks={metrics.total_books_in_catalog} 
        totalRevenue={metrics.total_revenue} 
        totalOrders={metrics.total_orders}
      />

      {/*Stock Monitoring*/}
      <StockMonitoring data={stockData} />
      
      {/*Top Things*/}
      <div className="grid grid-cols-6 mt-10 items-start">
        {/*Top Books*/}
        <div className="col-span-4 w-[95%] min-h-40 bg-background border-4 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-1.5 duration-200">
          <div className="h-20 border-b-4 bg-col-six flex items-center pl-10 gap-5">
            <FaArrowTrendUp color="white" size={40} />
            <h1 className="uppercase text-4xl font-bold text-white">Top Selling Books</h1>
          </div>
          {topSeller.length === 0 ? (
            <div className="flex justify-center mt-3 italic text-4xl">Oops! No book found.</div>
          ) : (
            <div className="flex flex-col items-center w-full py-4">
              {topSeller.map((ele: any) => (
                <AdminBookCard key={ele.id} image={ele.image} isbn={ele.isbn} title={ele.title} quantity={ele.total_sold} author={ele.author} />
              ))}
            </div>
          )}
        </div>

        {/*Top Customers*/}
        <div className="col-span-2 w-full min-h-40 bg-col-four border-4 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-1.5 duration-200">
          <div className="h-20 border-b-4 bg-black flex items-center pl-10 gap-5">
            <FaStar color="white" size={40} />
            <h1 className="uppercase text-4xl font-bold text-white">Top Customers</h1>
          </div>
          {topCust.length === 0 ? (
            <div className="flex justify-center mt-3 italic text-4xl">
              Ooops! No customer found.
            </div>
          ) : (
            <div className="flex flex-col items-center w-full py-4">
              {topCust.map((ele: any, idx: number) => (
                <CustomerProf key={idx} userName={ele.username} email={ele.email} totalSpent={ele.total_spent} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/*Recent Orders*/}
      <div className="w-full min-h-40 bg-white mt-10 border-4 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-1.5 duration-200">
        <div className="h-16 border-b-4 bg-col-five flex items-center pl-10 gap-5">
          <BsCartCheckFill color="white" size={40} />
          <h1 className="uppercase text-4xl font-bold text-white">Recent Added Books</h1>
        </div>
        {!books || books.length === 0 ? (
          <div className="flex justify-center mt-3 italic text-4xl">Ooops! No Book found.</div>
        ) : (
          <div className="">
            <div className="grid grid-cols-10">
              <div className="col-span-1 uppercase py-2 bg-col-one text-black text-center text-xl font-bold border-b-2 border-r-2">
                ISBN
              </div>
              <div className="col-span-3 uppercase py-2 bg-white text-black text-center text-xl font-bold border-b-2 border-r-2">
                Title
              </div>
              <div className="col-span-2 uppercase py-2 bg-col-one text-black text-center text-xl font-bold border-b-2 border-r-2">
                Author
              </div>
              <div className="col-span-1 uppercase py-2 bg-white text-black text-center text-xl font-bold border-b-2 border-r-2">
                Quantity
              </div>
              <div className="col-span-1 uppercase py-2 bg-col-one text-black text-center text-xl font-bold border-b-2 border-r-2">
                Amount
              </div>
              <div className="col-span-1 uppercase py-2 bg-white text-black text-center text-xl font-bold border-b-2 border-r-2">
                Discount
              </div>
              <div className="col-span-1 uppercase py-2 bg-col-one text-black text-center text-xl font-bold border-b-2">
                Edit
              </div>
            </div>
            {books.map((ele: any) => (
              <div key={ele.id} className="grid grid-cols-10">
                <div className="col-span-1 py-2 bg-col-one text-black text-center text-lg border-b-2 border-r-2">
                  {ele.isbn}
                </div>
                <div className="col-span-3 py-2 bg-white text-black text-center text-xl border-b-2 border-r-2">
                  {ele.title}
                </div>
                <div className="col-span-2 py-2 bg-col-one text-black text-center text-xl border-b-2 border-r-2">
                  {ele.author}
                </div>
                <div className="col-span-1 py-2 bg-white text-black text-center text-xl border-b-2 border-r-2">
                  {ele.stock_quantity}
                </div>
                <div className="col-span-1 py-2 bg-col-one text-black text-center text-xl border-b-2 border-r-2">
                  ₹ {formatUsNumber(ele.price)}
                </div>
                <div className="col-span-1 py-2 bg-white text-black text-center text-xl border-b-2 border-r-2">
                  {ele.discount_percentage}%
                </div>
                <div className="col-span-1 py-2 bg-col-one text-black text-center text-xl font-bold border-b-2">
                  <Link to={`/books/${ele.id}`} className="px-8 py-1 border-2 shadow-[3px_3px_0px_#000] duration-200 hover:shadow-none hover:translate-0.5 border-black bg-col-five uppercase text-white">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
