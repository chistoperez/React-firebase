import { useEffect, useState } from "react";
import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";
import formValidate from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternUrl } = formValidate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      email: "chistoperez@gmail.com",
      password: "123123",
    },
  });

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(pathURL + nanoid);
    setCopy({ [nanoid]: true });
  };

  return (
    <>
      <Title text="Home" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="http://www.your-url.com"
          {...register("url", {
            required,
            pattern: patternUrl,
          })}
          label="URL"
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>

        {newOriginID ? (
          <Button
            type="submit"
            text="Edit URL"
            color="green"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text="Add URL"
            color="purple"
            loading={loading.updateData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <Button
            type="button"
            text={copy[item.nanoid] ? "Copied to clipboard" : "Copy Short URL"}
            color="blue"
            onClick={() => handleClickCopy(item.nanoid)}
          />
          <Button
            type="button"
            text="Edit"
            color="green"
            onClick={() => handleClickEdit(item)}
          />
          <Button
            type="button"
            text="Delete"
            color="red"
            loading={loading[item.nanoid]}
            onClick={() => handleClickDelete(item.nanoid)}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
