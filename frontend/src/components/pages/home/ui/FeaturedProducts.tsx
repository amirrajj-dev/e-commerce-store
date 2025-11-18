import { useEffect } from "react";
import { useProducts } from "../../../../hooks/useProduct";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useAppSelector } from "../../../../stores/hook";
import { useCart } from "../../../../hooks/useCart";
import { toast } from "sonner";
import Product from "../../../common/Product/Product";
import LoadingState from "../../../common/LoadingState";

const FeaturedProducts = () => {
  const { featuredProducts, fetchFeaturedProducts, isLoading } = useProducts();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const { isAuthenticated } = useAppSelector((state) => state.user);
  const { addToCart, isAdding } = useCart();

  const handleAddToCart = async (productId: string, product: any) => {
    try {
      if (isAuthenticated) {
        await addToCart(productId, product);
        toast.success("product added to the cart successfully");
      } else {
        toast.error("you should login first");
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  if (isLoading) {
    return (
      <LoadingState txt="Loading featured products..." />
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 mt-12">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-success mb-4"
        >
          Featured Products
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base-content/70 text-lg max-w-2xl mx-auto"
        >
          Discover our handpicked selection of premium products
        </motion.p>
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".featured-swiper-button-next",
            prevEl: ".featured-swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".featured-swiper-pagination",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="px-4 sm:px-6 lg:px-8"
        >
          {featuredProducts.map((product, index) => (
            <SwiperSlide key={product.id}>
              <Product
                addToCart={handleAddToCart}
                index={index}
                isAdding={isAdding}
                product={product}
                key={product.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="featured-swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-sm btn-success btn-soft font-bold">
          <ArrowLeft size={20} />
        </button>
        <button className="featured-swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-sm btn-success btn-soft font-bold">
          <ArrowRight size={20} />
        </button>

        {/* Custom Pagination */}
        <div className="featured-swiper-pagination text-success flex justify-center mt-6 space-x-2"></div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
