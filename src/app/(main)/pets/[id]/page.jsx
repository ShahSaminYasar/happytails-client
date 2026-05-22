"use client";
import Loader from "@/components/Loader";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { token, useSession } from "@/lib/authClient";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const PetDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  //   States
  const [requestProcessing, setRequestProcessing] = useState(false);

  const {
    data: petData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
      );

      if (!result.ok) {
        throw new Error("Failed to fetch pet");
      }

      return result.json();
    },
    enabled: !!id,
  });

  if (!id) return redirect("/pets");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-30">
        <Loader />
      </div>
    );
  }

  if (isError || !petData) {
    return (
      <div className="py-30 text-center text-destructive">
        Failed to load pet details.
      </div>
    );
  }

  //   Functions
  const handleRequestAdoption = async (pickupDate, message) => {
    if (!user) return router.push("/login");
    if (!pickupDate) return toast.info("Pickup date is required");

    try {
      setRequestProcessing(true);

      const { data: tokenData } = await token();

      const payload = {
        name: user?.name,
        email: user?.email,
        petId: id,
        pickupDate,
        message,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/requests`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message || "Request sent successfully.");
        refetch();
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setRequestProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="relative w-full aspect-5/3 overflow-hidden rounded-sm">
            <Image
              src={petData?.photo}
              alt={petData?.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {petData?.name}
              </h1>

              <p className="text-secondary mt-1">
                {petData?.breed} • {petData?.species}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-sm p-4">
                <p className="text-sm text-secondary">Age</p>
                <h3 className="font-semibold">{petData?.age} years</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-secondary">Gender</p>
                <h3 className="font-semibold">{petData?.gender}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-secondary">Adoption Fee</p>
                <h3 className="font-semibold">${petData?.adoptionFee}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-secondary">Health Status</p>
                <h3 className="font-semibold">{petData?.healthStatus}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-secondary">Vaccination</p>
                <h3 className="font-semibold">{petData?.vaccinationStatus}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-secondary">Location</p>
                <h3 className="font-semibold">{petData?.location}</h3>
              </div>
            </div>

            {/* Description */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-3">
                About {petData?.name}
              </h2>

              <p className="text-secondary leading-7">{petData?.description}</p>
            </div>

            <p className="text-secondary/80 text-sm font-medium">
              Owner • {petData?.ownerName}
              {petData?.ownerEmail === user?.email ? " (You)" : ""}
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-1">Adopt {petData?.name} 🐾</h2>

          <p className="text-secondary text-sm mb-6">
            Fill out the form to send your adoption request
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              Swal.fire({
                title: "Are you sure?",
                text: `Request for adoption of ${petData?.name} will be sent to the owner.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, send request!",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleRequestAdoption(
                    e.target.pickupDate.value,
                    e.target.message.value,
                  );
                }
              });
            }}
            className="flex flex-col gap-4"
          >
            {/* Pet Name */}
            <div>
              <label className="text-sm font-medium mb-1 block">Pet Name</label>

              <input
                type="text"
                value={petData?.name}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-muted"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Your Name
              </label>

              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-muted"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Your Email
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-muted"
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Pickup Date
              </label>

              <input
                type="date"
                name="pickupDate"
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>

              <textarea
                name="message"
                rows={4}
                placeholder="Why would you like to adopt this pet?"
                className="w-full border rounded-lg px-3 py-2 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                petData?.ownerEmail === user?.email || requestProcessing
              }
              className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:opacity-90 transition disabled:grayscale"
            >
              {requestProcessing ? (
                <Spinner className={"mx-auto block"} />
              ) : (
                "Adopt Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
