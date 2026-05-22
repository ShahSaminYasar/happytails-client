"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const PetListingCard = ({
  pet,
  handleDelete,
  handleEdit,
  handleViewRequests,
}) => {
  const [imgSrc, setImgSrc] = useState(
    pet?.photo || "https://blocks.astratic.com/img/general-img-landscape.png",
  );

  return (
    <div className="border rounded-sm overflow-hidden shadow-xs hover:shadow-sm transition bg-card w-full max-w-sm mx-auto">
      {/* Photo */}
      <div className="relative w-full h-48">
        <Image
          src={imgSrc}
          alt={pet.name}
          fill
          className="object-cover"
          onError={() =>
            setImgSrc(
              "https://blocks.astratic.com/img/general-img-landscape.png",
            )
          }
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{pet.name}</h2>
          <span className="text-green-600 font-bold">${pet.adoptionFee}</span>
        </div>

        <p className="text-sm text-gray-500 capitalize">
          {pet.breed} • {pet.species}
        </p>

        <p className="text-xs text-gray-400">{pet.location}</p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => handleViewRequests(pet?._id, pet?.name)}
            className="bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600"
          >
            Requests
          </button>

          <button
            onClick={() => handleEdit(pet)}
            className="bg-yellow-500 text-white text-sm py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>

          <Link
            href={`/pets/${pet?._id}`}
            className="bg-green-500 text-white text-sm py-1 rounded hover:bg-green-600 text-center"
          >
            View
          </Link>

          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: `Confirm to delete the adoption post of ${pet?.name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(pet?._id);
                }
              });
            }}
            className="bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetListingCard;
