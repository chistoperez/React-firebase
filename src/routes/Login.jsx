import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import formValidate from "../utils/formValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);
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
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", { message: erroresFirebase(error.code) });
    }
  };
  return (
    <>
      <h1>Login</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
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
        >
          <FormError error={errors.password} />
        </FormInput>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
