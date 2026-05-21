"use client";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/authClient";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ErrorMsg = ({ msg }) => {
  return <p className="block text-xs font-semibold text-destructive">{msg}</p>;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  //   States
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      setProcessing(true);

      const { data: res, error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: redirectPath,
      });

      if (error) {
        toast.error(error?.message);
      }

      if (res) {
        toast.success(`Logged in as ${res?.user?.name}`);
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
          Welcome back, <span className="block font-bold">Pet Hero 🐾</span>
        </h2>

        <GoogleAuthButton />

        <span className="text-center block text-secondary my-2 text-sm">
          or
        </span>

        <Field>
          <FieldLabel>Email</FieldLabel>

          {/* Email */}
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

        <Field>
          <FieldLabel>Password</FieldLabel>

          {/* Password */}
          <div className="relative">
            <Input
              {...register("password", { required: "Password is required" })}
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
            />

            <button
              className="text-foreground absolute right-2 top-1/2 -translate-y-1/2"
              type="button"
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

        <Button
          size="lg"
          type="submit"
          className={"rounded-sm hover:rounded-none my-1 disabled:grayscale"}
          disabled={processing}
        >
          {processing ? <Spinner /> : "Log in"}
        </Button>

        <p className="text-sm font-medium block text-center">
          No account?{" "}
          <Link href={"/register"} className="text-primary">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
