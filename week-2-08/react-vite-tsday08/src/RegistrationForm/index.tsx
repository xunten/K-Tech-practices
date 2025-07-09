import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./RegistrationForm.module.css";

type Gender = "Male" | "Female" | "Other";

const countryList = ["Vietnam", "USA", "UK", "Canada", "Australia"];
const hobbiesList = ["Reading", "Traveling", "Gaming"];

const today = new Date();
const minBirthDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

// Yup validation schema
const schema = Yup.object({
  fullName: Yup.string().min(3, "Full Name must be at least 3 characters").required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters and contain letters and numbers")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\d{10,}$/, "Phone must be at least 10 digits")
    .required("Required"),
  gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
  dob: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Required")
    .max(minBirthDate, "You must be at least 18 years old"),
  country: Yup.string().required("Please select a country"),
  hobbies: Yup.array()
  .of(Yup.string())
  .transform((originalValue) => {
    if (originalValue === false || originalValue == null) return [];
    return originalValue;
  })
  .min(1, "Select at least one")
  .required("Select at least one"),
  profilePic: Yup
    .mixed()
    .required("Please upload a profile picture")
    .test("fileType", "Only jpg, jpeg, png files are allowed", (value) => {
      if (!value) return false;
      const file = value as File;
      return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    }),
  bio: Yup.string().max(300, "Max 300 characters").required("Bio is required"),
}).required();

type FormData = Yup.InferType<typeof schema>;

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    alert("Registration Successful!");
    console.log(data);
  };

  const bioValue = watch("bio") || "";

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Full Name */}
      <label htmlFor="fullName">Full Name</label>
      <input {...register("fullName")} />
      <p className={styles.error}>{errors.fullName?.message}</p>

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input type="email" {...register("email")} />
      <p className={styles.error}>{errors.email?.message}</p>

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input type="password" {...register("password")} />
      <p className={styles.error}>{errors.password?.message}</p>

      {/* Confirm Password */}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input type="password" {...register("confirmPassword")} />
      <p className={styles.error}>{errors.confirmPassword?.message}</p>

      {/* Phone */}
      <label htmlFor="phone">Phone</label>
      <input type="tel" {...register("phone")} />
      <p className={styles.error}>{errors.phone?.message}</p>

      {/* Gender */}
      <label>Gender</label>
      <div className={styles.radioGroup}>
        {(["Male", "Female", "Other"] as Gender[]).map((g) => (
          <label key={g} className={styles.radioLabel}>
            <input type="radio" value={g} {...register("gender")} />
            {g}
          </label>
        ))}
      </div>
      <p className={styles.error}>{errors.gender?.message}</p>

      {/* Date of Birth */}
      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        {...register("dob")}
        max={minBirthDate.toISOString().split("T")[0]}
      />
      <p className={styles.error}>{errors.dob?.message}</p>

      {/* Country */}
      <label htmlFor="country">Country</label>
      <select {...register("country")}>
        <option value="">-- Select Country --</option>
        {countryList.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <p className={styles.error}>{errors.country?.message}</p>

      {/* Hobbies */}
      <label>Hobbies</label>
      <div className={styles.checkboxGroup}>
        {hobbiesList.map((hobby) => (
          <label key={hobby} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              value={hobby}
              {...register("hobbies")}
            />
            {hobby}
          </label>
        ))}
      </div>
      <p className={styles.error}>{errors.hobbies?.message}</p>

      {/* Profile Picture */}
      <label htmlFor="profilePic">Profile Picture</label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        {...register("profilePic")}
      />
      <p className={styles.error}>{errors.profilePic?.message}</p>

      {/* Bio */}
      <label htmlFor="bio">Bio (optional, max 300 chars)</label>
      <textarea rows={4} maxLength={300} {...register("bio")} />
      <div className={styles.charCount}>
        {300 - bioValue.length} characters remaining
      </div>
      <p className={styles.error}>{errors.bio?.message}</p>

      {/* Submit */}
      <button type="submit" className={styles.submitBtn}>Register</button>
    </form>
  );
};

export default RegistrationForm;
