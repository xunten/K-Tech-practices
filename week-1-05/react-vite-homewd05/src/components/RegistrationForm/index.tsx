import React, { useState } from "react";
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

function isValidEmail(email: string) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function isValidPassword(password: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function isValidPhone(phone: string) {
  return /^\d{10,}$/.test(phone.replace(/\D/g, ""));
}

function isOver18(dateStr: string) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return date <= minBirthDate;
}

function isImageFile(file: File) {
  return /\.(jpe?g|png)$/i.test(file.name);
}

const RegistrationForm: React.FC = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "" as Gender | "",
    dob: "",
    country: "",
    hobbies: [] as string[],
    profilePic: null as File | null,
    bio: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bioChars, setBioChars] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "hobbies") {
      const checked = (e.target as HTMLInputElement).checked;
      setValues((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter((h) => h !== value),
      }));
    } else if (name === "profilePic") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setValues((prev) => ({ ...prev, profilePic: file }));
    } else if (name === "bio") {
      setValues((prev) => ({ ...prev, bio: value.slice(0, 300) }));
      setBioChars(value.length > 300 ? 300 : value.length);
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (values.fullName.trim().length < 3)
      errs.fullName = "Full Name must be at least 3 characters.";
    if (!isValidEmail(values.email))
      errs.email = "Email must be a valid email format.";
    if (!isValidPassword(values.password))
      errs.password =
        "Password must be at least 8 characters and contain letters and numbers.";
    if (values.confirmPassword !== values.password)
      errs.confirmPassword = "Confirm Password must match the password.";
    if (!isValidPhone(values.phone))
      errs.phone = "Phone Number must be at least 10 digits.";
    if (!values.gender)
      errs.gender = "You must select a gender.";
    if (!values.dob)
      errs.dob = "Date of Birth is required.";
    else if (!isOver18(values.dob))
      errs.dob = "You must be at least 18 years old.";
    if (!values.country)
      errs.country = "Please select a country.";
    if (!values.hobbies.length)
      errs.hobbies = "Please select at least one hobby.";
    if (!values.profilePic)
      errs.profilePic = "Please upload a profile picture.";
    else if (!isImageFile(values.profilePic))
      errs.profilePic =
        "Profile Picture must be a .jpg, .jpeg, or .png image file.";
    if (values.bio.length > 300)
      errs.bio = "Bio must be at most 300 characters.";

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration Successful! (Form data can be processed here.)");
      // Handle form submission logic
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Full Name */}
      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        value={values.fullName}
        onChange={handleChange}
        aria-describedby="fullName-error"
        required
      />
      {errors.fullName && (
        <div className={styles.error} id="fullName-error">
          {errors.fullName}
        </div>
      )}

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        aria-describedby="email-error"
        required
      />
      {errors.email && (
        <div className={styles.error} id="email-error">
          {errors.email}
        </div>
      )}

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        aria-describedby="password-error"
        required
      />
      {errors.password && (
        <div className={styles.error} id="password-error">
          {errors.password}
        </div>
      )}

      {/* Confirm Password */}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        aria-describedby="confirmPassword-error"
        required
      />
      {errors.confirmPassword && (
        <div className={styles.error} id="confirmPassword-error">
          {errors.confirmPassword}
        </div>
      )}

      {/* Phone Number */}
      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        aria-describedby="phone-error"
        required
      />
      {errors.phone && (
        <div className={styles.error} id="phone-error">
          {errors.phone}
        </div>
      )}

      {/* Gender */}
      <label>Gender</label>
      <div className={styles.radioGroup}>
        {(["Male", "Female", "Other"] as Gender[]).map((g) => (
          <label key={g} className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value={g}
              checked={values.gender === g}
              onChange={handleChange}
              required
            />
            {g}
          </label>
        ))}
      </div>
      {errors.gender && (
        <div className={styles.error}>{errors.gender}</div>
      )}

      {/* Date of Birth */}
      <label htmlFor="dob">Date of Birth</label>
      <input
        id="dob"
        name="dob"
        type="date"
        value={values.dob}
        onChange={handleChange}
        aria-describedby="dob-error"
        max={minBirthDate.toISOString().split("T")[0]}
        required
      />
      {errors.dob && (
        <div className={styles.error} id="dob-error">
          {errors.dob}
        </div>
      )}

      {/* Country */}
      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        value={values.country}
        onChange={handleChange}
        aria-describedby="country-error"
        required
      >
        <option value="">-- Select Country --</option>
        {countryList.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>
      {errors.country && (
        <div className={styles.error} id="country-error">
          {errors.country}
        </div>
      )}

      {/* Hobbies */}
      <label>Hobbies</label>
      <div className={styles.checkboxGroup}>
        {hobbiesList.map((hobby) => (
          <label key={hobby} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="hobbies"
              value={hobby}
              checked={values.hobbies.includes(hobby)}
              onChange={handleChange}
            />
            {hobby}
          </label>
        ))}
      </div>
      {errors.hobbies && (
        <div className={styles.error}>{errors.hobbies}</div>
      )}

      {/* Profile Picture */}
      <label htmlFor="profilePic">Profile Picture</label>
      <input
        id="profilePic"
        name="profilePic"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
        aria-describedby="profilePic-error"
        required
      />
      {errors.profilePic && (
        <div className={styles.error} id="profilePic-error">
          {errors.profilePic}
        </div>
      )}

      {/* Bio */}
      <label htmlFor="bio">Bio (optional, max 300 chars)</label>
      <textarea
        id="bio"
        name="bio"
        value={values.bio}
        onChange={handleChange}
        aria-describedby="bio-error"
        maxLength={300}
        rows={4}
      />
      <div className={styles.charCount}>
        {300 - values.bio.length} characters remaining
      </div>
      {errors.bio && (
        <div className={styles.error} id="bio-error">
          {errors.bio}
        </div>
      )}

      {/* Register Button */}
      <button type="submit" className={styles.submitBtn}>
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;