"use client";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signIn, signUp } from "@/lib/authClient";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

const ErrorMsg = ({ msg }) => {
  return <p className="block text-xs font-semibold text-destructive">{msg}</p>;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const password = useWatch({
    control,
    name: "password",
  });

  // states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleLogin = async (data) => {
    const { name, email, photoUrl, password } = data;

    try {
      setProcessing(true);

      const { data: res, error } = await signUp.email({
        name,
        email,
        password,
        image: photoUrl,
        callbackURL: redirectPath,
      });

      if (error) {
        toast.error(error?.message);
      }

      if (res) {
        toast.success(`Registered successfully as ${res?.user?.name}`);
        router.push(redirectPath);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="py-10 px-3">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-sm mx-auto flex flex-col gap-3"
      >
        <h2 className="text-4xl font-semibold text-foreground block text-left tracking-tighter w-full leading-12 mb-3">
          Join the <span className="block font-bold">Pet Hero Family 🐾</span>
        </h2>

        <GoogleAuthButton />

        <span className="text-center block text-secondary my-2 text-sm">
          or
        </span>

        {/* Name */}
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
            placeholder="Your full name"
          />
          {errors.name && <ErrorMsg msg={errors.name.message} />}
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="example@email.com"
          />
          {errors.email && <ErrorMsg msg={errors.email.message} />}
        </Field>

        {/* Photo URL */}
        <Field>
          <FieldLabel>Photo URL</FieldLabel>
          <Input
            {...register("photoUrl")}
            type="text"
            placeholder="URL of your profile photo"
          />
          {errors.photoUrl && <ErrorMsg msg={errors.photoUrl.message} />}
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel>Password</FieldLabel>

          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },

                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Must contain at least one uppercase letter",

                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Must contain at least one lowercase letter",
                },
              })}
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
            />

            <button
              type="button"
              className="text-foreground absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? (
                <EyeIcon size={20} />
              ) : (
                <EyeClosedIcon size={20} />
              )}
            </button>
          </div>

          {errors.password && <ErrorMsg msg={errors.password.message} />}
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>

          <div className="relative">
            <Input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="********"
            />

            <button
              type="button"
              className="text-foreground absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setConfirmPasswordVisible((prev) => !prev)}
            >
              {confirmPasswordVisible ? (
                <EyeIcon size={20} />
              ) : (
                <EyeClosedIcon size={20} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <ErrorMsg msg={errors.confirmPassword.message} />
          )}
        </Field>

        {/* Submit */}
        <Button
          size="lg"
          type="submit"
          className="rounded-sm hover:rounded-none my-1 disabled:grayscale"
          disabled={processing}
        >
          {processing ? <Spinner /> : "Create Account"}
        </Button>

        <p className="text-sm font-medium block text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
