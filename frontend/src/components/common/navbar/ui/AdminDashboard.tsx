import { ShieldUser } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to={"/admin-dashboard"} className="btn btn-success btn-sm">
        <ShieldUser size={18} />
        <span>Dashboard</span>
      </Link>
    </motion.div>
  );
};

export default AdminDashboard;
