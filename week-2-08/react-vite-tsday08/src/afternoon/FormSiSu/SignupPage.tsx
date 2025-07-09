import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  agree: yup
    .boolean()
    .oneOf([true], "You must agree to the terms")
    .required("You must agree to the terms"),
});


type SignUpFormData = yup.InferType<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    alert("Sign Up Success!\n" + `${data.name}`);
  };

  return (
      <div className="bg-[url(/images/photo.png)] bg-cover bg-center w-[330px] h-[680px] bg-black rounded-3xl p-2 shadow-lg relative">
        <ChevronLeft className="text-white pt-3 pl-3" size={35} />
        <div className="pt-42">
          <h2 className="text-4xl font-semibold mb-4 text-slate-200 ml-4">
            Sign up
          </h2>
          <div className="mt-8 backdrop-blur-sm p-4 rounded-lg">
                        <p className="text-gray-300 text-sm mb-4">
              Looks like you don't have an account.
              <br />
              Let's create a new account for{" "}
              <span className="text-white">jane.doe@gmail.com</span>
            </p>

            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              
              <div>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-green-500 text-black placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  defaultValue=""
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

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

              <div className="text-xs text-gray-400 mb-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("agree")}
                  className="mt-1"
                />
                <label>
                  I agree to{" "}
                  <a href="#" className="text-green-400 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-green-400 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agree && (
                <p className="text-red-400 text-sm">{errors.agree.message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#03C38E] text-white font-semibold py-3 rounded-lg hover:bg-green-500 transition"
              >
                Agree and continue
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
