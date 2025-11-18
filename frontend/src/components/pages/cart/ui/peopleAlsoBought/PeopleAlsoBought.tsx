import { useEffect } from "react";
import { useProducts } from "../../../../../hooks/useProduct";
import { useCart } from "../../../../../hooks/useCart";
import Product from "../../../../common/Product/Product";
import { useAppSelector } from "../../../../../stores/hook";
import { toast } from "sonner";
import LoadingState from "../../../../common/LoadingState";

const PeopleAlsoBought = () => {
  const { recommendedProducts, fetchRecommendedProducts, isLoading } =
    useProducts();
  const { addToCart, isAdding } = useCart();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  const handleAddToCart = async (productId: string, product: any) => {
    try {
      if (isAuthenticated) {
        await addToCart(productId, product);
        toast.success("product added to the cart successfully");
      } else {
        toast.error("you should login first");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "failed to add poduct to the cart"
      );
    }
  };

  if (isLoading) {
    return (
     <LoadingState txt="Loading People Also Bought Section..." />
    );
  }

  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 mt-8">
      <h2 className="text-3xl md:text-4xl text-success font-bold text-center">
        People Also Bought
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.map((product, index) => (
          <Product
            index={index}
            product={product}
            addToCart={handleAddToCart}
            isAdding={isAdding}
            key={product?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
