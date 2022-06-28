import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import formValidate from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
  const { registerUser } = useContext(UserContext);

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "chistoperez@gmail.com",
      password: "123123",
      repassword: "123123",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text="Register" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Email"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Confirm password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Confirm password"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <Button type="submit" text="Register" />
      </form>
    </>
  );
};

export default Register;
