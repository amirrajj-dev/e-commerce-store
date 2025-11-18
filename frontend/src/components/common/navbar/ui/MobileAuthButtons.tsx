import { motion } from "framer-motion";
import { itemVariants } from "../variants/variants";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../stores/reducers/user/user.thunks";
import { toast } from "sonner";
import { useAppDispatch } from "../../../../stores/hook";

interface MobileAuthButtonsProps {
    user : any;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileAuthButtons = ({user , setIsMenuOpen} : MobileAuthButtonsProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
    const handleSignOut = async ()=>{
    await dispatch(logoutUser())
    toast.success('logged out succesfully')
      navigate('/signin')
  }
  return (
    <motion.div variants={itemVariants} className="space-y-2">
      {user ? (
        <button onClick={handleSignOut} className="btn btn-error btn-block justify-start">
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      ) : (
        <>
          <Link
            to={"/signup"}
            className="btn btn-success btn-soft btn-block justify-start"
            onClick={() => setIsMenuOpen(false)}
          >
            <UserPlus size={18} />
            <span>Sign Up</span>
          </Link>
          <Link
            to={"/signin"}
            className="btn btn-success btn-soft btn-block justify-start"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default MobileAuthButtons;
