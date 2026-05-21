import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const page = async ({ params }) => {
  const { id } = await params;

  const petData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
    {
      cache: "no-store",
    },
  ).then((res) => res.json());

  if (!id || !petData) return redirect("/pets");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="relative w-full h-100 overflow-hidden rounded-sm">
            <Image
              src={petData?.imageUrl}
              alt={petData?.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {petData?.name}
              </h1>

              <p className="text-muted-foreground mt-1">
                {petData?.breed} • {petData?.species}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">Age</p>
                <h3 className="font-semibold">{petData?.age} years</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">Gender</p>
                <h3 className="font-semibold">{petData?.gender}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">Adoption Fee</p>
                <h3 className="font-semibold">${petData?.adoptionFee}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">Health Status</p>
                <h3 className="font-semibold">{petData?.healthStatus}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">Vaccination</p>
                <h3 className="font-semibold">{petData?.vaccinationStatus}</h3>
              </div>

              <div className="border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">Location</p>
                <h3 className="font-semibold">{petData?.location}</h3>
              </div>
            </div>

            {/* Description */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-3">
                About {petData?.name}
              </h2>

              <p className="text-muted-foreground leading-7">
                {petData?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-1">Adopt {petData?.name} 🐾</h2>

          <p className="text-muted-foreground text-sm mb-6">
            Fill out the form to send your adoption request
          </p>

          <form className="space-y-4">
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
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>

              <textarea
                rows={4}
                placeholder="Why would you like to adopt this pet?"
                className="w-full border rounded-lg px-3 py-2 resize-none"
              />
            </div>

            {/* Hidden Status */}
            <input type="hidden" value="pending" name="status" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:opacity-90 transition"
            >
              Adopt Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
