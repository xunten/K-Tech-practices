import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {  Eye, EyeOff } from "lucide-react";

const usernameRegex = /^(?:\d{10,15}|[\w.-]+@[\w.-]+\.\w{2,})$/;

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .matches(usernameRegex, "Enter a valid email or phone number")
    .min(5, "Must be at least 5 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^[^\s]+$/, "No spaces allowed")
    .matches(/[a-zA-Z]/, "Must contain at least one letter"),
  remember: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function FormRegister() {
  const {
  register,
  handleSubmit,
  formState: { errors, isValid },
} = useForm<LoginFormData>({
  resolver: yupResolver(schema),
  mode: "onChange",
});

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    console.log("Form submitted:", data);
    if (data.remember) {
      console.log("Simulate saving to localStorage...");
    }
    alert("Signed in successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 bg-[#ECF1F5] text-shadow-blue-950 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-semibold mb-4 text-start">
          Set Your Panner <br/>
          Recruiter on Auto-Pilot
        </h1>
        <img
          src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/grovia.png"
          alt="Lottery Display"
          className="w-100 h-auto"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white p-40 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Login</h2>
        <p className="text-blue-800 text-xl font-semibold mb-6 ">
          Login to you account 
        </p>
        <span className="">Thank you for get back to Grovia, lét access our the best
        recommendation contact for you.</span>
        <hr className="border-t border-gray-300 my-4" />


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Username</label>
            <input
              type="text"
              placeholder="you@example.com or 064287****"
              {...register("username")}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-medium text-blue-800 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full border border-gray-300 p-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-blue-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me + Reset */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Reset Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid}
          >
            Sign In
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 underline">
              Join Grovia Now!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
