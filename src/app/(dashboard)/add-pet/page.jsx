import AddPetForm from "./AddPetForm";

const page = () => {
  return (
    <div className="w-full p-5 flex justify-center items-center flex-col gap-3">
      <h2 className="text-4xl font-medium text-foreground block text-center tracking-tighter w-full leading-12 mb-3">
        <span className="font-bold">Add pet</span> for adoption
      </h2>

      <AddPetForm />
    </div>
  );
};
export default page;
