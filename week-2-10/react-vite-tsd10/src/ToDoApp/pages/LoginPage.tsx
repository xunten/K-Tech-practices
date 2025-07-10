import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthContext from "../contexts/context";
import { login } from "../services";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const schema = yup.object({
  username: yup
    .string().email('Email is invalid').required('Email is required'),
  password: yup
    .string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  remember: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   username: 'tungnt@softech.vn',
    //   password: '123456789',
    // },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("Form submitted:", data);
    if (data.remember) {
      console.log("Simulate saving to localStorage...");
    }
    // Call API to authenticate user
    const result = await login(data.username, data.password);
    console.log('Login result:', result);

    const authenticatedUser = {
      id: result.loggedInUser.id,
      email: result.loggedInUser.email,
      access_token: result.access_token,
    };
    // alert("Signed in successfully!");

    setUser(authenticatedUser);

    // save user info to localStorage
    localStorage.setItem('user', JSON.stringify(authenticatedUser));

    // save access token to localStorage
    localStorage.setItem('access_token', result.access_token);

    window.location.href = '/tasks'; // Redirect to tasks page
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-10 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          Set Your Planner <br /> Recruiter on Auto-Pilot
        </h1>
        <DotLottieReact
          src="https://lottie.host/ebb9aa1f-11d8-4846-abde-0c9defaedd77/AMvthuw3pS.lottie"
          loop
          autoplay
          className="w-full max-w-md"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white px-6 py-10 sm:px-10 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-800">
          Login
        </h2>
        <p className="text-blue-800 text-base sm:text-lg font-semibold mb-4">
          Login to your account
        </p>
        <span className="text-sm text-gray-600">
          Thank you for coming back to Grovia. Let’s access the best recommended contacts for you.
        </span>
        <hr className="border-t border-gray-300 my-5" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Username</label>
            <input
              type="text"
              placeholder="you@example.com or 064287****"
              {...register("username")}
              className="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-400 outline-none"
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
              className="w-full border border-gray-300 p-2 rounded pr-10 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-blue-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember + Reset */}
          <div className="flex items-center justify-between text-sm text-gray-600">
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
            disabled={!isValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 underline">
              Join Grovia Now!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
