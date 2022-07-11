import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import formValidate from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm({
    defaultValues: {
      email: "chistoperez@gmail.com",
      password: "123123",
    },
  });
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Title text="Login" />
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

        <Button text="Login" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Login;
