import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    alert("Login Success!\n" + `${data.email}`);
  };

  return (
      <div className="bg-[url(/images/photo.png)] bg-cover bg-center w-[330px] h-[680px] bg-black rounded-3xl p-2 shadow-lg relative">
        <ChevronLeft className="text-white pt-3 pl-3" size={35} />
        <div className="pt-42">
          <h2 className="text-4xl font-semibold mb-4 text-slate-200 ml-4">
            Login
          </h2>
          <div className="mt-8 backdrop-blur-sm p-4 rounded-lg">
            {/* image */}
            <div className="text-white mb-4 flex gap-4">
              <img className="h-12" src="./images/avt3.png" />
              <div>
                <p className="text-sm font-semibold">Name</p>
                <span className="text-xs">jane.doe@gmail.com</span>
              </div>
            </div>
            
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >

              <div>
                <input
                  {...register("email")}
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-green-600 text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  defaultValue=""
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-green-600 text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  tabIndex={-1}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-sm font-semibold text-green-400 mb-4 flex items-start gap-2">
                Forgot your password?
              </div>

              <button
                type="submit"
                className="w-full bg-[#03C38E] text-white font-semibold py-3 rounded-lg hover:bg-green-500 transition"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
