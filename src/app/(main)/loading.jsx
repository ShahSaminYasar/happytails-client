import Loader from "@/components/Loader";

const loading = () => {
  return (
    <div className="w-full py-20 px-3 flex items-center justify-center">
      <Loader />
    </div>
  );
};
export default loading;
