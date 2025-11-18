import { Link } from "react-router-dom";
import { ShieldUser, Menu, X, Loader2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./ui/Logo";
import AdminDashboard from "./ui/AdminDashboard";
import DesktopAuthButtons from "./ui/DesktopAuthButtons";
import { itemVariants, menuVariants } from "./variants/variants";
import MobileAuthButtons from "./ui/MobileAuthButtons";
import DesktopCart from "./ui/CartDesktop";
import MobileCart from "./ui/MobileCart";
import { useAppSelector } from "../../../stores/hook";
import { useCart } from "../../../hooks/useCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  const { totalItems, fetchCart } = useCart();
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [fetchCart , isAuthenticated]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          <Logo />
          {/* Desktop Navigation */}
          {isLoading ? (
            <div className="hidden md:flex">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && (
                <DesktopCart
                  cartLength={
                    totalItems || 0
                  }
                />
              )}
              {user?.role === "ADMIN" && <AdminDashboard />}

              <DesktopAuthButtons isAuthenticatd={isAuthenticated} />
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden btn btn-ghost btn-circle"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-base-200 rounded-lg overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2Icon className="animate-spin" />
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {/* Cart Mobile */}
                  {isAuthenticated && (
                    <MobileCart
                      cartLength={
                        totalItems || 0
                      }
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  )}

                  {/* Admin Dashboard Mobile */}
                  {user?.role === "ADMIN" && (
                    <motion.div variants={itemVariants}>
                      <Link
                        to={"/admin-dashboard"}
                        className="btn btn-success btn-block justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ShieldUser size={18} />
                        <span>Admin Dashboard</span>
                      </Link>
                    </motion.div>
                  )}
                  <MobileAuthButtons
                    setIsMenuOpen={setIsMenuOpen}
                    user={user}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
