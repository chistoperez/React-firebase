import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  const { registerUser } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({ defaultValues: { email: "chistoperez@gmail.com" } });

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      // if (error.code === "auth/email-already-in-use") {
      //   console.log("User Registered");
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", { message: "User Registered" });
          break;
        case "auth/invalid-email":
          setError("email", { message: "invalid email" });
          break;
        default:
          console.log("server error");
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "This field is required" },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register(
            "password",
            {
              setValueAs: (v) => v.trim(),
              minLength: { value: 6, message: "Password minimum 6 characters" },
              validate: {
                tirm: (v) => {
                  if (!v.trim()) return "No spaces";
                  return true;
                },
              },
            },
            { required: true }
          )}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Confirm password"
          {...register("repassword", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("password") || "Passwords don't match",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
