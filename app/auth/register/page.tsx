"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const formSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }),
    name: z.string().min(1, { message: "Name is required" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: "Password must contain at least one letter",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one capital letter",
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: "Password confirm is required" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/register", values);
      if (res.status === 200) {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:py-16 px-8 self-center  lg:w-2/5 lg:max-w-md rounded-md w-full">
          <Card className="w-full bg-black bg-opacity-70 border-none">
            <CardHeader>
              <CardTitle className=" text-white py-4">Register</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4">
                  <p className="text-red-500">{error}</p>
                </div>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                {...field}
                                placeholder="Name"
                                type="text"
                                className="bg-gray-600 bg-opacity-50 text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-yellow-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={loading}
                                {...field}
                                placeholder="Email"
                                type="email"
                                className="bg-gray-600 bg-opacity-50 text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-yellow-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="password"
                                disabled={loading}
                                {...field}
                                placeholder="Password"
                                className="bg-gray-600 bg-opacity-50 text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-yellow-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Password confirm"
                                  type="password"
                                  {...field}
                                  disabled={loading}
                                  className="bg-gray-600 bg-opacity-50 text-white"
                                />
                              </FormControl>
                              <FormMessage className="text-yellow-500" />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={loading}
                    className="w-full mt-4"
                  >
                    Sign Up
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex flex-row items-center justify-center gap-4 mt-4">
                <div
                  className="h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  onClick={() => signIn("google", { callbackUrl: "/profile" })}
                >
                  <FcGoogle size={25} />
                </div>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FaFacebook size={25} />
                </div>
              </div>
              <p className="text-neutral-500 mt-4">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
