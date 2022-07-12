import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRedirect from "./components/layouts/LayoutRedirect";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/UserProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Perfil from "./routes/Perfil";
import Register from "./routes/Register";

const App = () => {
  const { user } = useContext(UserContext);
  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
