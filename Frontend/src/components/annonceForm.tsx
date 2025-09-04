import { annonce as annonceBase } from "@/lib/auth";
import type { AnnonceFormState } from "@/lib/types";
import { useAuth } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createCategoriesQueryOptions } from "@/queryOptions/createCategoryQueryOptions";
import SubmitButton from "./submitButton";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { createAnnoncerByUserQueryOption } from "@/queryOptions/createAnnoncerByUserQueryOption";

const AnnonceForm = () => {
  const { loginData } = useAuth();

  const annonce = (prevState: AnnonceFormState, formData: FormData) =>
    annonceBase(prevState, formData, loginData?.accessToken);

  const [state, action] = useActionState(annonce, undefined);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);

  const { data: categoryList } = useSuspenseQuery(
    createCategoriesQueryOptions()
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      toast.success(`Annonce ${loginData?.user.name} was create!`, {
        id: "login-success",
      });

      queryClient.invalidateQueries({
        queryKey: createAnnoncerByUserQueryOption(loginData?.user.id || 0)
          .queryKey,
      });

      navigate({
        to: "/category/product/$product",
        params: { product: title.toLocaleUpperCase() },
      });
    }
  }, [state?.success, navigate, loginData, title, queryClient]);

  return (
    <form
      action={action}
      className="w-full h-100 flex mt-5 flex-col justify-center max-w-xs space-y-4 text-black"
    >
      <div>
        <label htmlFor="title">Title</label>
        <div className="relative flex items-center gap-2 rounded-md border-2 border-app-primary px-3 py-2 focus-within:ring-2 focus-within:ring-app-primary">
          <MailIcon className="h-5 w-5 text-gray-600" />
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Title"
            className="flex-1 border-none outline-0 border-0 bg-transparent focus:ring-0 p-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="title"
            required
          />
        </div>
        {state?.error?.title && (
          <p className="text-sm text-red-500 text-center">
            {state.error.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="title">Kategori</label>
        <div className="relative flex items-center gap-2">
          <Select name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Hvilken kategori tilhører dit produkt..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kategori</SelectLabel>
                {categoryList.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {state?.error?.category && (
          <p className="text-sm text-red-500 text-center">
            {state.error.category}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="text">Annonce tekst</label>
        <textarea
          id="text"
          name="text"
          placeholder="Beskrivelse"
          className=" border-2 border-app-primary rounded-md px-3 py-2 bg-transparent resize-none focus:ring-0 p-0 w-full "
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        {state?.error?.text && (
          <p className="text-sm text-red-500 text-center">{state.error.text}</p>
        )}
      </div>

      <div>
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="Billede URL"
          className="border-2 border-app-primary rounded-md px-3 py-2 bg-transparent focus:ring-0 p-0 w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        {state?.error?.url && (
          <p className="text-sm text-red-500 text-center">{state.error.url}</p>
        )}
      </div>

      <div>
        <label htmlFor="price">Pris</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Pris"
          className="border-2 border-app-primary rounded-md px-3 py-2 bg-transparent focus:ring-0 p-0 w-full"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          required
        />
        {state?.error?.price && (
          <p className="text-sm text-red-500 text-center">
            {state.error.price}
          </p>
        )}
      </div>
      <SubmitButton>Opret</SubmitButton>
    </form>
  );
};
export default AnnonceForm;
