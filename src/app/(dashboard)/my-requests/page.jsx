"use client";

import Loader from "@/components/Loader";
import RequestCard from "@/components/RequestCard";
import { token, useSession } from "@/lib/authClient";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MyRequestsPage = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data: tokenData } = await token();
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      ).then((res) => res.json());

      console.log("RES:", result);

      return result || [];
    },
  });

  const handleDeleteRequest = async (id) => {
    if (!id) return toast.info("ID not detected, invalid request.");

    try {
      const { data: tokenData } = await token();

      const payload = { id };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message || "Request deleted successfully.");
        refetch();
      } else {
        toast.error(data.message || "Failed to delete request.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <section className="w-full flex flex-col gap-3">
      <h3 className="text-3xl sm:text-4xl font-medium text-foreground mb-2">
        My <span className="font-semibold">Requests</span>
      </h3>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="block text-destructive font-medium text-sm py-10 px-3 text-center">
          {error}
        </p>
      ) : data?.length === 0 ? (
        <p className="block text-secondary/50 font-medium text-sm py-10 px-3 text-center">
          You have not made any adoption requests yet.
        </p>
      ) : (
        data?.map((request) => (
          <RequestCard
            key={request?._id}
            request={request}
            handleDelete={handleDeleteRequest}
          />
        ))
      )}
    </section>
  );
};
export default MyRequestsPage;
