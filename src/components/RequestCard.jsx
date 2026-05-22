"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const RequestCard = ({ request, handleDelete }) => {
  const { _id, pickupDate, message, status, pet } = request;

  return (
    <div className="border rounded-lg overflow-hidden bg-card flex flex-col md:flex-row shadow-xs">
      <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0">
        <Image src={pet?.photo} alt={pet?.name} fill className="object-cover" />
      </div>

      <div className="flex-1 p-5 md:p-6 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center flex-wrap gap-3">
              <h3 className="text-2xl md:text-3xl font-bold">{pet?.name}</h3>

              <span className="capitalize text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {status}
              </span>
            </div>

            <p className="text-secondary/50 mt-1 capitalize">
              {pet?.breed} • {pet?.species} • {pet?.gender}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href={`/pets/${pet?._id}`}>View Pet</Link>
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: `Confirm to cancel the adoption request?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, cancel it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDelete(_id);
                  }
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-sm p-2 bg-background">
            <p className="text-xs text-secondary/50 mb-1">Pickup Date</p>

            <h4 className="font-semibold text-sm">{pickupDate}</h4>
          </div>

          <div className="border rounded-sm p-2 bg-background">
            <p className="text-xs text-secondary/50 mb-1">Adoption Fee</p>

            <h4 className="font-semibold text-sm">${pet?.adoptionFee}</h4>
          </div>

          <div className="border rounded-sm p-2 bg-background">
            <p className="text-xs text-secondary/50 mb-1">Health</p>

            <h4 className="font-semibold text-sm capitalize">
              {pet?.healthStatus}
            </h4>
          </div>

          <div className="border rounded-sm p-2 bg-background">
            <p className="text-xs text-secondary/50 mb-1">Vaccination</p>

            <h4 className="font-semibold text-sm capitalize">
              {pet?.vaccinationStatus}
            </h4>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-sm text-secondary/50">Location</p>

            <h4 className="font-medium">{pet?.location}</h4>
          </div>

          <div>
            <p className="text-sm text-secondary/50">Adoption Message</p>

            <p className="text-foreground/80 leading-7">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
