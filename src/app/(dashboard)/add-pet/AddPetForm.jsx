"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { token, useSession } from "@/lib/authClient";
import { PlusIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPetForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // States
  const [processing, setProcessing] = useState(false);

  const handleAddPet = async (e) => {
    e.preventDefault();

    if (!session) return router.push("/login");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("ownerEmail", session?.user?.email);

    try {
      setProcessing(true);

      const { data: tokenData } = await token();

      const payload = Object.fromEntries(formData.entries());

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        toast.success(data.message || "Published successfully");
        router.push(`/my-listings`);
      } else {
        toast.error(data.message || "Failed to publish post.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleAddPet}
      className="w-full max-w-sm mx-auto flex items-center justify-center flex-col gap-4"
    >
      <Field>
        <FieldLabel htmlFor="name">Pet Name</FieldLabel>
        <Input name="name" placeholder="Name of the pet" required />
      </Field>

      <Field>
        <FieldLabel>Species</FieldLabel>
        <Select name="species" required>
          <SelectTrigger>
            <SelectValue placeholder="Select species" />
            <SelectContent>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="bird">Bird</SelectItem>
              <SelectItem value="fish">Fish</SelectItem>
              <SelectItem value="rabbit">Rabbit</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </Field>

      <Field>
        <FieldLabel>Breed (optional)</FieldLabel>
        <Input name="breed" placeholder="Breed of the pet" />
      </Field>

      <Field>
        <FieldLabel>Age</FieldLabel>
        <Input name="age" placeholder="0y 0m" type="text" required />
      </Field>

      <Field>
        <FieldLabel>Gender</FieldLabel>
        <Select name="gender" required>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </Field>

      <Field>
        <FieldLabel>Image URL</FieldLabel>
        <Input
          name="photo"
          placeholder="Photo URL of the pet"
          type="text"
          required
        />
      </Field>

      <Field>
        <FieldLabel>Health Status</FieldLabel>
        <Select name="healthStatus" required>
          <SelectTrigger>
            <SelectValue placeholder="Select health status" />
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="under treatment">Under Treatment</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </Field>

      <Field>
        <FieldLabel>Vaccination Status</FieldLabel>
        <Select name="vaccinationStatus" required>
          <SelectTrigger>
            <SelectValue placeholder="Select vaccination status" />
            <SelectContent>
              <SelectItem value="vaccinated">Vaccinated</SelectItem>
              <SelectItem value="not vaccinated">Not vaccinated</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="location">Location</FieldLabel>
        <Input
          name="location"
          placeholder="Detailed location"
          type="text"
          required
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
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
        <Textarea
          name="description"
          placeholder="Tell more about the pet..."
          rows={5}
        />
      </Field>

      <Button
        size="lg"
        className={"w-full disabled:grayscale"}
        disabled={processing}
      >
        <PlusIcon /> Add Pet
      </Button>
    </form>
  );
};
export default AddPetForm;
