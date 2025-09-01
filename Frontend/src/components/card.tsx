import { api } from "@/lib/api";
import type { T_Product } from "@/lib/types";
import { useAuth } from "@/lib/utils";
import { createProductsQueryOptions } from "@/queryOptions/createProductsQueryOptions.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const Card = ({
  title,
  imageUrl,
  description,
  slug,
  favorites,
  id,
  numFavorites,
}: T_Product) => {
  const { loginData } = useAuth();

  const queryClient = useQueryClient();

  // Show if the user has favorited this item
  const isFavorited = favorites.some(
    (fav) => fav.userId === loginData?.user.id
  );

  const onFavorited = async () => {
    if (!loginData) return;
    if (isFavorited) {
      await api.delete(`favorites/${id}`, loginData.accessToken);
    } else {
      await api.post("favorites", { productId: id }, loginData.accessToken);
    }
    queryClient.invalidateQueries({
      queryKey: createProductsQueryOptions().queryKey,
    });
  };

  const handleClick = () => {
    toast.error("Du skal være logget ind for at kunne tilføje favoritter.", {
      id: "noLogin",
    });
  };

  return (
    <figure className="bg-app-surface rounded-xl shadow-md overflow-hidden flex flex-col w-full max-w-sm mx-auto">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover object-center bg-app-background"
        fetchPriority="high"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="p-4 flex flex-col gap-2 justify-center md:flex-1">
        <p className="text-xl font-bold text-app-primary mb-1">{title}</p>
        <article className="text-gray-600 text-sm">{description}</article>
        <div className="flex justify-between items-center mt-2">
          <Link to="/products/$product" params={{ product: slug }}>
            <button
              aria-label="Read mere"
              className="hover:cursor-pointer px-4 py-2 bg-green-gold text-white rounded bg-app-primary hover:bg-app-accent transition"
            >
              Læs mere
            </button>
          </Link>
          <div className="flex gap-2 items-center justify-center">
            <p>{numFavorites}</p>
            {loginData ? (
              <Heart
                fill={isFavorited ? "#fc0303" : "none"}
                onClick={onFavorited}
                className="cursor-pointer"
              />
            ) : (
              <Heart onClick={handleClick} />
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
export default Card;
