import { categories } from "../../../data/data";
import CategoryItem from "./ui/CategoryItem";
import FeaturedProducts from "./ui/FeaturedProducts";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col capitalize items-center justify-center">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-success font-bold mb-4">
          Explore Our Categories
        </h1>
        <p className="text-base-content/80 text-sm sm:text-base lg:text-lg font-medium max-w-2xl">
          Explore the latest brands in eco-friendly fashion
        </p>
      </div>

      {/* Categories Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryItem key={category.id} {...category} />
          ))}
        </div>
      </div>
      {/* featured products  */}
      <FeaturedProducts />
    </div>
  );
};

export default Home;
