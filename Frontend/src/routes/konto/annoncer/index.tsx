import { Spinner } from "@/components/spinner";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/utils";
import { createAnnoncerByUserQueryOption } from "@/queryOptions/createAnnoncerByUserQueryOption";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/konto/annoncer/")({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
  head: () => ({
    meta: [
      { title: `Produkt: | My Template` },
      {
        name: "description",
        content: `Se detaljer, ingredienser og fremgangsmåde for produktet i My Template.`,
      },
    ],
  }),
});

function RouteComponent() {
  const { loginData } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: item,
    isError,
    error,
    refetch,
  } = useSuspenseQuery(
    createAnnoncerByUserQueryOption(loginData?.user.id || 0)
  );

  const handleDelete = async (id: number) => {
    await api.delete(`products/${id}`, loginData?.accessToken);
    toast.success("product delete", {
      id: "product-delete",
    });
    queryClient.invalidateQueries({
      queryKey: createAnnoncerByUserQueryOption(loginData?.user.id || 0)
        .queryKey,
    });
  };

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2">
        <div className="bg-app-surface p-6  shadow text-app-text border border-app-secondary w-full max-w-md">
          <p className="text-red-500 mb-2 font-semibold text-center">
            Something went wrong.
          </p>
          <p className="text-app-secondary text-sm mb-4 text-center break-words">
            Error: {error.message}
          </p>
          <button
            aria-label="Refetch the api"
            className="bg-app-primary text-white px-4 hover:cursor-pointer py-2 rounded transition-colors w-full font-semibold"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!item || item.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2">
        <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
          <p className="text-app-primary mb-2 font-semibold text-center">
            Du har ingen annoncer endnu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {item.map((product) => (
        <div
          key={product.id}
          className="border border-app-primary  overflow-hidden bg-white shadow flex flex-col md:flex-row"
        >
          <div className="flex-1 p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center bg-app-primary px-4 py-2">
              <span className="text-white font-semibold text-lg">
                {product.name}
              </span>
              <span className="text-white font-semibold">
                Pris: {product.price} kr
              </span>
            </div>
            <div className="py-2 px-1 text-app-text text-sm">
              {product.description?.length > 0
                ? product.description
                : "Ingen beskrivelse."}
            </div>
            <div className="flex justify-between items-center px-1 pb-2">
              <Link
                className="text-app-primary hover:underline text-sm font-medium"
                to="/category/product/$product"
                params={{ product: product.slug }}
              >
                Gå til annonce
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:underline text-sm font-medium hover:cursor-pointer"
              >
                Fjern annonce
              </button>
            </div>
          </div>
          {product.image && (
            <div className="w-full md:w-48 h-32 md:h-auto flex items-center justify-center p-2">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover max-h-32 md:max-h-48 w-full"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
