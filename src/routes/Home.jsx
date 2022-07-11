import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID("");
      setText("");
      return;
    }

    await addData(text);
    setText("");
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    setText(item.origin);
    setNewOriginID(item.nanoid);
  };

  return (
    <>
      <Title text="Home" />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="http://www.your-url.com"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
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
