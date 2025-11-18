import { motion } from "framer-motion";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../stores/hook";
import { logoutUser } from "../../../../stores/reducers/user/user.thunks";
import { toast } from "sonner";

const DesktopAuthButtons = ({ isAuthenticatd }: { isAuthenticatd: any }) => {
  const dispatch = useAppDispatch()  
  const navigate = useNavigate()
  const handleSignOut = async ()=>{
    await dispatch(logoutUser())
    toast.success('logged out succesfully')
      navigate('/signin')
  }
  return (
    <div className="flex items-center space-x-2">
      {isAuthenticatd ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-error btn-sm"
          onClick={handleSignOut}
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </motion.button>
      ) : (
        <>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={"/signup"} className="btn btn-success btn-soft btn-sm">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={"/signin"} className="btn btn-success btn-soft btn-sm">
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default DesktopAuthButtons;
