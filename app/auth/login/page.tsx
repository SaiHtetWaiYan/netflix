"use client";
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

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export default function AuthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/profile");
    } else {
      setError(res?.error ?? null);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:py-16 px-8 self-center  lg:w-2/5 lg:max-w-md rounded-md w-full">
          <Card className="w-full bg-black bg-opacity-70 border-none">
            <CardHeader>
              <CardTitle className=" text-white py-4">Sign In</CardTitle>
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
                  </div>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={loading}
                    className="w-full mt-6"
                  >
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex flex-row items-center justify-center gap-4">
                <div
                  className="h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  onClick={() => signIn("google", { callbackUrl: "/profile" })}
                >
                  <FcGoogle size={25} />
                </div>
              </div>
              <p className="text-neutral-500 mt-4">
                New to Netflix?
                <Link
                  href="/auth/register"
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  Sign up now
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
