import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../services/axios";

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/users/me");
        if (res.data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <h2 className="text-3xl font-black italic">VERIFYING ACCESS...</h2>
      </div>
    );
  }

  if (isAdmin === false) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
