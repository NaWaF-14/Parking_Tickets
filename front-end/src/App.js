import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/sign-up/SignUp";
import LogIn from "./components/log-in/LogIn";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/login" exact element={<LogIn />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
