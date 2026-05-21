"use client";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/authClient";
import toast from "react-hot-toast";

const GoogleAuthButton = ({ redirectPath = "/" }) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className={"border border-foreground"}
      type="button"
      onClick={async () => {
        const res = await signIn.social({
          provider: "google",
          callbackURL: redirectPath,
        });

        if (res.error) {
          toast.error(res.error.message || "Sign in failed");
        }
      }}
    >
      <GoogleLogoIcon size={20} /> Continue with Google
    </Button>
  );
};
export default GoogleAuthButton;
