"use client";
import { X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../stores/hook";
import { closeModal } from "../../../stores/reducers/modal/modal.slice";

const Modal = () => {
  const { title, isOpen, content ,  } = useAppSelector(state=>state.modal)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) dispatch(closeModal());
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md"
            onClick={()=>dispatch(closeModal())}
          />
          
          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="relative bg-base-100 rounded-md shadow-2xl border border-base-300 w-full max-w-lg max-h-[90vh] overflow-hidden"
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-success to-accent" />
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-base-300">
              <motion.h3 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-base-content"
              >
                {title}
              </motion.h3>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={()=>dispatch(closeModal())}
                className="p-2 text-base-content/60 hover:text-base-content hover:bg-base-300 rounded-xl transition-all duration-200 group"
              >
                <X size={20} className="group-hover:scale-110 hover:text-success transition-transform" />
              </motion.button>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 max-h-[60vh] overflow-y-auto"
            >
              {content}
            </motion.div>

            {/* Subtle blinear */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-t from-base-100/50 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;