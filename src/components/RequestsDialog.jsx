"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { token } from "@/lib/authClient";
import Loader from "./Loader";
import AdoptionRequestCard from "./AdoptionRequestCard";
import toast from "react-hot-toast";

const RequestsDialog = ({
  petId,
  petName,
  open,
  setOpen,
  adopted,
  mainRefetch,
}) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["pet-adoption-requests", petId],
    queryFn: async () => {
      const { data: tokenData } = await token();
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests?petId=${petId}`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      ).then((res) => res.json());

      console.log("RES:", result);

      return result || [];
    },
    enabled: !!petId,
  });

  const handleChangeStatus = async (id, status, petId) => {
    if (adopted) return toast("Pet has been adopted already");

    try {
      const { data: tokenData } = await token();

      const payload = {
        status,
        petId,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message);
        if (status === "approved") {
          mainRefetch();
        }
        refetch();
      } else {
        toast.error(data.message || "Failed to update the request.");
      }
    } catch (error) {
      console.error("Failed to update request", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>Requests of adoption</DialogTitle>
          <DialogDescription>
            Pet name: {petName} ({adopted ? "Adopted" : "Not adopted yet"})
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 w-full">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="block text-destructive font-medium text-sm py-10 px-3 text-center">
              {error}
            </p>
          ) : data?.length === 0 ? (
            <p className="block text-secondary/50 font-medium text-sm py-10 px-3 text-center">
              No adoption requests yet.
            </p>
          ) : (
            data?.map((request) => (
              <AdoptionRequestCard
                key={request?._id}
                request={request}
                handleChangeStatus={handleChangeStatus}
                setOpen={setOpen}
                adopted={adopted}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default RequestsDialog;
