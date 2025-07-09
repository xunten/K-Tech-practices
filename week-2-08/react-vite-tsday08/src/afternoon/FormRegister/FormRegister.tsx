import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {  Eye, EyeOff } from "lucide-react";

const phoneRegExp = /^[0-9]{10,15}$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;

const schema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone must be 10–15 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegExp,
      "Password must be 8+ characters, include uppercase, lowercase, number, no spaces"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  newsletter: yup.boolean().optional().default(false),
  agree: yup
    .boolean()
    .oneOf([true], "You must agree to the terms")
    .required("You must agree to the terms"),
});

type FormData = yup.InferType<typeof schema>;

export default function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("✅ Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          A few clicks away from creating your Lottery Display
        </h1>
        <img
          src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/lottery-display.svg"
          alt="Lottery Display"
          className="w-100 h-auto"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white p-18 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Register</h2>
        <p className="text-blue-800 text-xl font-semibold mb-6 ">
          Manage all your lottery efficiently
        </p>
        <span className="">Let's get you all set up so you can verify your personal account and begin setting up profile.</span>
        <hr className="border-t border-gray-300 my-4" />


        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="font-bold text-base text-blue-800">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="First Name (*)"
                className="w-full border border-gray-300 p-2 rounded mt-2"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
                <label className="font-bold text-base text-blue-800">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name (*)"
                className="w-full border border-gray-300 p-2 rounded mt-2"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="font-bold text-base text-blue-800">Phone number</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Phone Number (*)"
                className="w-full border border-gray-300 p-2 rounded mt-2"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
                <label className="font-bold text-base text-blue-800">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email (*)"
                className="w-full border border-gray-300 p-2 rounded mt-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="relative">
                <label className="font-bold text-base text-blue-800">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password (*)"
                className="w-full border border-gray-300 p-2 rounded pr-10 mt-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-11 text-sm text-blue-800"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="relative">
                <label className="font-bold text-base text-blue-800">Confirm Password</label>
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm Password (*)"
                className="w-full border border-gray-300 p-2 rounded pr-10 mt-2"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-11 text-sm text-blue-800"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Newsletter + Terms */}
          <div className="flex flex-col gap-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("newsletter")} />
              Yes, I want to receive Lottery Display emails
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("agree")} />
              <span>
                I agree to all the{" "}
                <a href="#" className="text-blue-800 underline">
                  Terms, Privacy Policy, and Fees
                </a>
              </span>
            </label>
            {errors.agree && <p className="text-red-500 text-sm">{errors.agree.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid || !watch("agree")}
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
