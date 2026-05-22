"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const RequestCard = ({ request, handleApprove, handleReject }) => {
  const { _id, name, email, pickupDate, status, pet } = request;

  const isFinal = status === "approved" || status === "rejected";

  return (
    <div className="border rounded-xl p-4 bg-background flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base md:text-lg font-semibold leading-tight">
            {pet?.name}
          </h3>

          <p className="text-xs text-muted-foreground">
            {pet?.breed} • {pet?.species}
          </p>
        </div>

        <span
          className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize whitespace-nowrap ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
        <p>
          <span className="text-foreground font-medium">User:</span> {name}
        </p>

        <p>
          <span className="text-foreground font-medium">Email:</span> {email}
        </p>

        <p>
          <span className="text-foreground font-medium">Pickup:</span>{" "}
          {pickupDate}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="text-xs h-8 px-3"
        >
          <Link href={`/pets/${pet?._id}`}>View</Link>
        </Button>

        {!isFinal && (
          <>
            <Button
              size="sm"
              className="text-xs h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleApprove(_id)}
            >
              Approve
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="text-xs h-8 px-3"
              onClick={() => handleReject(_id)}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
