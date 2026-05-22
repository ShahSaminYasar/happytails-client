"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { token } from "@/lib/authClient";
import toast from "react-hot-toast";

const PetEditDialog = ({ petData, open, setOpen, refetch }) => {
  const [processing, setProcessing] = useState(false);

  const handleEditPetData = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData(e.target);
    const updatedPet = Object.fromEntries(formData.entries());

    try {
      const { data: tokenData } = await token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${petData?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(updatedPet),
        },
      );

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message);
        setOpen(false);
        refetch();
      } else {
        toast.error(data.message || "Failed to update the pet's data.");
      }
    } catch (error) {
      console.error("Failed to update pet:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-1">
          <DialogTitle>Edit Pet</DialogTitle>
          <DialogDescription>ID: {petData?._id}</DialogDescription>
        </div>

        <form onSubmit={handleEditPetData} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="name">Pet Name</FieldLabel>
            <Input
              name="name"
              placeholder="Name of the pet"
              required
              defaultValue={petData?.name}
            />
          </Field>

          <Field>
            <FieldLabel>Species</FieldLabel>
            <Select name="species" required defaultValue={petData?.species}>
              <SelectTrigger>
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="bird">Bird</SelectItem>
                <SelectItem value="fish">Fish</SelectItem>
                <SelectItem value="rabbit">Rabbit</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Breed (optional)</FieldLabel>
            <Input
              name="breed"
              placeholder="Breed of the pet"
              defaultValue={petData?.breed}
            />
          </Field>

          <Field>
            <FieldLabel>Age</FieldLabel>
            <Input
              name="age"
              placeholder="0y 0m"
              type="text"
              required
              defaultValue={petData?.age}
            />
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Select name="gender" required defaultValue={petData?.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Image URL</FieldLabel>
            <Input
              name="photo"
              placeholder="Photo URL of the pet"
              type="text"
              required
              defaultValue={petData?.photo}
            />
          </Field>

          <Field>
            <FieldLabel>Health Status</FieldLabel>
            <Select
              name="healthStatus"
              required
              defaultValue={petData?.healthStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select health status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="under treatment">Under Treatment</SelectItem>
                <SelectItem value="sick">Sick</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Vaccination Status</FieldLabel>
            <Select
              name="vaccinationStatus"
              required
              defaultValue={petData?.vaccinationStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vaccination status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccinated">Vaccinated</SelectItem>
                <SelectItem value="not vaccinated">Not vaccinated</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              name="location"
              placeholder="Detailed location"
              type="text"
              required
              defaultValue={petData?.location}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="adoptionFee">Adoption Fee</FieldLabel>
            <Input
              name="adoptionFee"
              min="0"
              placeholder="0.00"
              type="number"
              required
              defaultValue={petData?.adoptionFee}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">
              Description (optional)
            </FieldLabel>
            <Textarea
              name="description"
              placeholder="Tell more about the pet..."
              rows={5}
              defaultValue={petData?.description}
            />
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={processing}
              className="disabled:grayscale"
            >
              {processing ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PetEditDialog;
