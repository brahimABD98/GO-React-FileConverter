import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function Login() {
  const loginSchema = z.object({
    email: z.coerce.string().email().trim(),
    password: z.coerce.string().min(8).max(32),
  });
  type Login = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const res = await fetch(`http:localhost:1100/login`, {
      body: data,
    });

    console.log(res);
  };

  return (
    <>
      <div className="relative flex h-screen flex-col justify-center overflow-hidden  ">
        <div className="m-auto w-full rounded-md bg-base-100 p-6 shadow-md ring-2  lg:max-w-lg">
          <h1 className="text-center text-3xl font-semibold ">DaisyUI</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label">
                <span className="label-text text-base">Email</span>
              </label>
              <input
                {...register("email")}
                type="text"
                placeholder="Email Address"
                className="input-bordered input w-full"
              />
              {errors.email && (
                <span className="text-error">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text text-base">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
                className="input-bordered input w-full"
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>
            <a
              href="#"
              className="text-xs text-gray-200 hover:text-blue-600 hover:underline"
            >
              Forget Password?
            </a>
            <div>
              <button className="btn-block btn">Login</button>
            </div>
            <span className="pt-2">
              need an account ?
              <Link
                to="/signup"
                className=" p-2 text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign up for free now !
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
