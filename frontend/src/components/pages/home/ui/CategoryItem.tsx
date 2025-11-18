import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  href: string;
  image: string;
  name: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ href, image, name }) => {
  return (
    <Link
      to={`/categories${href}`}
      className="relative group overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={image}
          alt={`${name} category`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
          {name}
        </h3>
        <p className="text-white/90 text-sm sm:text-base font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
          Explore our {name}
        </p>
      </div>

      {/* Hover Indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-success text-white p-2 rounded-full">
        <ArrowRight />
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
