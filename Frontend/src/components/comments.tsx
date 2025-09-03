import { api } from "@/lib/api";
import { useAuth } from "@/lib/utils";
import { createCommentsQueryOptions } from "@/queryOptions/createCommentQueryOptions";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Comments = ({ id, userId }: { id: number; userId: number }) => {
  const queryClient = useQueryClient();
  const { loginData } = useAuth();

  const { data: item } = useSuspenseQuery(createCommentsQueryOptions(id));

  const handleDelete = async (coomentId: number) => {
    if (!loginData) {
      toast.error("Need to Login", { id: "NeedLogin" });
      return;
    }
    if (await api.delete(`comments/${coomentId}`, loginData?.accessToken)) {
      queryClient.invalidateQueries({
        queryKey: createCommentsQueryOptions(id).queryKey,
      });
    }

    toast.success("Comment delete", { id: "Comment delete" });
  };

  return (
    <section className="my-5">
      <ul className="flex flex-col gap-8">
        {item.map((comment, index) => {
          const isOwn = userId === loginData?.user.id;
          return (
            <li
              key={index}
              className={`flex ${isOwn ? "justify-start" : "justify-end"}`}
            >
              <div className="max-w-[60%]">
                <div
                  className={`text-xs mb-1 ${isOwn ? "text-left" : "text-right"} text-gray-600"`}
                >
                  {comment.user.firstname}
                  {isOwn ? " (sælger): " : ""}
                </div>
                <div className="border-2 border-app-accent bg-[#fafafa] p-3 text-gray-900">
                  {comment.comment}
                </div>
                {loginData?.user.id == comment.user.id ? (
                  <p
                    className={` ${isOwn ? "text-left" : "text-right"} text-red-500 text-[14px] hover:cursor-pointer`}
                    onClick={() => handleDelete(comment.id)}
                  >
                    slet kommentar
                  </p>
                ) : (
                  <div></div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Comments;
