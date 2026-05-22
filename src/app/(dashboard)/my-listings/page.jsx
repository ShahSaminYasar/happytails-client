"use client";
import Loader from "@/components/Loader";
import PetCard from "@/components/PetCard";
import PetEditDialog from "@/components/PetEditDialog";
import PetListingCard from "@/components/PetListingCard";
import RequestsDialog from "@/components/RequestsDialog";
import { token, useSession } from "@/lib/authClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const MyListingsPage = () => {
  const { data: session } = useSession();

  // States
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPetData, setEditingPetData] = useState({});
  const [requestsDialogOpen, setRequestsDialogOpen] = useState(false);
  const [requestsOfPetId, setRequestsOfPetId] = useState("");
  const [requestsOfPetName, setRequestsOfPetName] = useState("");
  const [requestedPetAdopted, setRequestedPetAdopted] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["listings", session],
    queryFn: async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?ownerEmail=${session?.user?.email}`,
      ).then((res) => res.json());

      return result || [];
    },
    enabled: !!session,
  });

  const handleDeletePet = async (id) => {
    if (!id) return toast.info("ID not detected, invalid request.");

    try {
      const { data: tokenData } = await token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message || "Pet post deleted successfully.");
        refetch();
      } else {
        toast.error(data.message || "Failed to delete pet post.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleEdit = (data) => {
    setEditingPetData(data);
    setEditDialogOpen(true);
  };

  const handleViewAdoptionRequests = (petId, petName, adopted) => {
    setRequestsOfPetId(petId);
    setRequestsOfPetName(petName);
    setRequestedPetAdopted(adopted);
    setRequestsDialogOpen(true);
  };

  return (
    <>
      <section className="w-full flex flex-col gap-3">
        <h3 className="text-3xl sm:text-4xl font-medium text-foreground mb-2">
          My <span className="font-semibold">Listings</span>
        </h3>

        {isLoading || !session ? (
          <Loader />
        ) : isError ? (
          <p className="block text-destructive font-medium text-sm py-10 px-3 text-center">
            {error}
          </p>
        ) : data?.length === 0 ? (
          <p className="block text-secondary/50 font-medium text-sm py-10 px-3 text-center">
            You have not published any pet adoption posts yet.{" "}
            <Link className="text-primary" href="/add-pet">
              Add post
            </Link>
          </p>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex flex-col gap-1 items-start p-3 rounded-sm border-2 border-primary/50">
                <span className="text-xl font-normal text-secondary">
                  {data?.length}
                </span>
                <span className="text-sm font-semibold text-primary">
                  Total listings
                </span>
              </div>

              <div className="flex flex-col gap-1 items-start p-3 rounded-sm border-2 border-primary/50">
                <span className="text-xl font-normal text-secondary">
                  {data?.filter((item) => item?.adopted === false)?.length}
                </span>
                <span className="text-sm font-semibold text-primary">
                  Available
                </span>
              </div>

              <div className="flex flex-col gap-1 items-start p-3 rounded-sm border-2 border-primary/50">
                <span className="text-xl font-normal text-secondary">
                  {data?.filter((item) => item?.adopted === true)?.length}
                </span>
                <span className="text-sm font-semibold text-primary">
                  Adopted
                </span>
              </div>
            </div>

            <div
              className={
                "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              }
            >
              {data?.map((pet) => (
                <PetListingCard
                  key={pet?._id}
                  pet={pet}
                  handleDelete={handleDeletePet}
                  handleEdit={handleEdit}
                  handleViewRequests={handleViewAdoptionRequests}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <PetEditDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        petData={editingPetData}
        refetch={refetch}
      />

      <RequestsDialog
        open={requestsDialogOpen}
        setOpen={setRequestsDialogOpen}
        petId={requestsOfPetId}
        petName={requestsOfPetName}
        adopted={requestedPetAdopted}
        mainRefetch={refetch}
      />
    </>
  );
};
export default MyListingsPage;
