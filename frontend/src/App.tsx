import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/home/Home";
import SignUp from "./components/pages/auth/signup/SignUp";
import SignIn from "./components/pages/auth/signin/SignIn";
import Navbar from "./components/common/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "./stores/hook";
import { useEffect, useState } from "react";
import { checkAuth } from "./stores/reducers/user/user.thunks";
import { useAxiosInterceptor } from "./hooks/useAxiosIntercepter";
import Loading from "./components/common/loading/Loading";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import Modal from "./components/common/modal/Modal";
import CategoryProducts from "./components/pages/categoryProducts/CategoryProducts";
import Cart from "./components/pages/cart/Cart";
import NotFound from "./components/pages/notfound/NotFound";
import PurchaseSuccess from "./components/pages/purchaseSuccess/PurchaseSuccess";
import PurchaseCancel from "./components/pages/purchaseCancel/PurchaseCancel";

const App = () => {
  useAxiosInterceptor();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (error : any) {
        console.log(error);
      } finally {
        setAuthChecked(true);
      }
    };
    if (!authChecked) {
      initializeAuth();
    }
  }, [dispatch, authChecked]);
  if (!location.pathname.includes("sign") && (isLoading || !authChecked)) {
    return <Loading />;
  }

  const isAllowedToSeeAdminDashboard =
    isAuthenticated && user?.role === "ADMIN";

  return (
    <div className="font-sans">
      <div className="fixed inset-0 bg-linear-to-br brightness-160 from-success-content/90 via-base-100 to-accent-content/80"></div>

      <div className="relative z-10">
        {!location.pathname.includes("/sign") && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Public Auth Routes */}
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
          />

          {/* cateogry product route  */}
          <Route path="/categories/:category" element={<CategoryProducts />} />

          {/* cart route */}
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to={"/"} />}
          />

          <Route
            path="/admin-dashboard"
            element={
              isAllowedToSeeAdminDashboard ? (
                <AdminDashboard />
              ) : isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace state={{ from: location }} />
              )
            }
          />
          <Route path="purchase-success" element={<PurchaseSuccess/>} />
          <Route path="purchase-cancel" element={<PurchaseCancel/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Modal />
      </div>
    </div>
  );
};

export default App;
