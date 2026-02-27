import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./RegisterForm.css";


const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least 1 number"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  terms: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions"),
});

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setSuccessMessage("Registration Successful!");
    reset();
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <div className="input-group">
        <input type="text" placeholder="Full Name" {...register("fullName")} />
        <p className="error">{errors.fullName?.message}</p>
      </div>

      <div className="input-group">
        <input type="email" placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>
      </div>

      <div className="input-group">
        <input type="password" placeholder="Password" {...register("password")} />
        <p className="error">{errors.password?.message}</p>
      </div>

      <div className="input-group">
        <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
        <p className="error">{errors.confirmPassword?.message}</p>
      </div>

      <div className="checkbox-group">
        <input type="checkbox" {...register("terms")} />
        <span>Accept Terms & Conditions</span>
      </div>
      <p className="error">{errors.terms?.message}</p>

      <button type="submit" className={successMessage ? "success" : ""}>
        Submit
      </button>

      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default RegisterForm;