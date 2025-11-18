import { useEffect } from "react";
import { useProducts } from "../../../../../hooks/useProduct";
import { Edit, Star, StarOff, Trash } from "lucide-react";
import { openModal } from "../../../../../stores/reducers/modal/modal.slice";
import { useAppDispatch } from "../../../../../stores/hook";
import EditProductForm from "./ui/editProductForm/EditProductForm";
import DeleteConfirmation from "./ui/DeleteConfirmation";
import SkeletonRows from "./ui/SkeletonRows";
import { toast } from "sonner";
import { motion, type Variants } from "framer-motion"; 

const ProductsTable = ({
  currentTab,
}: {
  currentTab: "analytics" | "table" | "create";
}) => {
  const {
    allProducts,
    fetchAllProducts,
    isLoading,
    error,
    toggleFeatured,
    isUpdating,
  } = useProducts();

  const toggleFeatureProduct = async (productId: string) => {
    await toggleFeatured(productId);
    toast.success("product updated successfully");
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const dispatch = useAppDispatch();

  const variant: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Error state
  if (error) {
    return (
      <motion.div
        variants={variant}
        initial="hidden"
        animate={currentTab === "table" ? "visible" : "hidden"}
        className="alert alert-error"
      >
        <div className="flex-1">
          <label className="">Error loading products: {error}</label>
        </div>
        <button onClick={fetchAllProducts} className="btn btn-ghost btn-sm">
          Retry
        </button>
      </motion.div>
    );
  }

  // Empty state
  if (!isLoading && allProducts.length === 0) {
    return (
      <motion.div
        variants={variant}
        initial="hidden"
        animate={currentTab === "table" ? "visible" : "hidden"}
        className="text-center py-8"
      >
        <div className="text-base-content/50 text-lg mb-4">
          No products found
        </div>
        <button onClick={fetchAllProducts} className="btn btn-success">
          Refresh
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate={currentTab === "table" ? "visible" : "hidden"}
      className="overflow-x-auto  max-h-[700px]"
    >
      <table className="table table-sm md:table-md xl:table-lg w-full bg-base-200">
        {/* head */}
        <thead className="bg-base-300">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>IsFeatured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonRows />
          ) : (
            allProducts.map((product, index) => (
              <motion.tr key={product.id} variants={variant} initial="hidden" animate={currentTab === 'table' ? 'visible' : 'hidden'} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="flex gap-2 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-14 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-image.jpg";
                      }}
                    />
                    <span className="font-medium line-clamp-2">{product.name}</span>
                  </div>
                </td>
                <td className="font-semibold">${product.price}</td>
                <td>
                  <span
                    className={`badge ${
                      product.quantity === 0 ? "badge-error" : "badge-success"
                    }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td>
                  <span className="badge badge-outline text-nowrap">
                    {product.category}
                  </span>
                </td>
                <td>
                  {product.isFeatured ? (
                    <div
                      className="tooltip tooltip-warning"
                      data-tip="Featured Product"
                    >
                      <Star className="text-warning fill-current" size={20} />
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="Not Featured">
                      <Star className="text-gray-400" size={20} />
                    </div>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        dispatch(
                          openModal({
                            title: "Delete Confirmation",
                            content: (
                              <DeleteConfirmation productId={product.id} />
                            ),
                          })
                        )
                      }
                      className="btn btn-sm btn-circle btn-soft tooltip tooltip-error btn-error"
                      data-tip="Delete"
                    >
                      <Trash size={18} />
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          openModal({
                            title: "Edit Product",
                            content: <EditProductForm product={product} />,
                          })
                        )
                      }
                      className="btn btn-sm btn-circle btn-soft tooltip tooltip-info btn-info"
                      data-tip="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    {product.isFeatured ? (
                      <button
                        disabled={isUpdating}
                        onClick={() => toggleFeatureProduct(product.id)}
                        className="btn btn-sm btn-circle btn-soft tooltip tooltip-warning btn-warning disabled:opacity-50 disabled:cursor-not-allowed"
                        data-tip="Mark as UnFeatured"
                      >
                        <StarOff size={18} />
                      </button>
                    ) : (
                      <button
                        disabled={isUpdating}
                        onClick={() => toggleFeatureProduct(product.id)}
                        className="btn btn-sm btn-circle btn-soft tooltip tooltip-warning btn-warning disabled:opacity-50 disabled:cursor-not-allowed"
                        data-tip="Mark as Featured"
                      >
                        <Star size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>

      {/* Results count */}
      {!isLoading && (
        <motion.div
          variants={variant}
          initial="hidden"
          animate={currentTab === "table" ? "visible" : "hidden"}
          className="text-sm text-gray-500 mt-4"
        >
          Showing {allProducts.length} product
          {allProducts.length !== 1 ? "s" : ""}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductsTable;
