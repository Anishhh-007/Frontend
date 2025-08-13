import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { adminProfile } from "../redux/slice/AdminProfileSlice";
import { workerProfile } from "../redux/slice/WorkerSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Use consistent selectors that match your store shape:
  const adminData = useSelector((s) => s.admin?.profile || null);
  const workerData = useSelector((s) => s.worker?.profile || null);

  // Helper fetch functions that return the response or null
  const fetchAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/profile", {
        withCredentials: true,
      });
      dispatch(adminProfile(res.data));
      return res.data;
    } catch (err) {
      return null;
    }
  };

  const fetchWorker = async () => {
    try {
      const res = await axios.get("http://localhost:8000/worker/profile", {
        withCredentials: true,
      });
      dispatch(workerProfile(res.data));
      return res.data;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // run both concurrently
      const [adminRes, workerRes] = await Promise.allSettled([
        fetchAdmin(),
        fetchWorker(),
      ]);

      if (!mounted) return;

      // Determine which profile exists
      const adminExists = adminRes.status === "fulfilled" && adminRes.value;
      const workerExists = workerRes.status === "fulfilled" && workerRes.value;

      // If user is already on auth pages, avoid redirect loops
      const onAuthRoute = location.pathname.startsWith("/auth") ||
                          location.pathname.startsWith("/authentication") ||
                          location.pathname.startsWith("/login") ||
                          location.pathname.startsWith("/workersignup");

      if (adminExists) {
        if (!onAuthRoute) {
          // Either let them stay where they are, or send to admin home
         // navigate('/'); // optionally
        }
      } else if (workerExists) {
        if (!onAuthRoute) {
       //   navigate('/'); // optionally
        }
      } else {
        // nobody logged in -> go to public auth route (but don't redirect if already on auth route)
        if (!onAuthRoute) navigate("/authentication");
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [dispatch, navigate, location.pathname]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
