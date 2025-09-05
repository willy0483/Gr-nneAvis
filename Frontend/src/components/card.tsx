import type { T_Product } from "@/lib/types";
import { Link } from "@tanstack/react-router";

const Card = ({ image, name, description, price, slug }: T_Product) => {
  return (
    <Link to={"/category/product/$product"} params={{ product: slug }}>
      <figure className="bg-white rounded w-full flex flex-col h-full box-border overflow-hidden">
        <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] mb-2 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t"
          />
          <span className="absolute bottom-1 left-1 bg-white bg-opacity-80 text-gray-900 text-xs font-semibold px-2 py-1 rounded shadow">
            Pris: {price} kr.
          </span>
        </div>
        <figcaption className="px-2 pb-2 flex-1 flex flex-col justify-start">
          <div className="font-bold text-sm sm:text-base mb-1 text-gray-900 truncate">
            {name}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 line-clamp-2">
            {description}
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};
export default Card;
