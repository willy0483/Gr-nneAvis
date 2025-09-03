import { useAuth } from "@/lib/utils";
import { createCommentsQueryOptions } from "@/queryOptions/createCommentQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

const Comments = ({ id, userId }: { id: number; userId: number }) => {
  const { loginData } = useAuth();

  const {
    data: item,
    isPending,
    isError,
    error,
  } = useSuspenseQuery(createCommentsQueryOptions(id));

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
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Comments;
