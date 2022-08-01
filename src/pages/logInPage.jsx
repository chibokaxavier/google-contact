import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { authService } from "../services/auth.service";
import { setAuth, setLoggedIn } from "../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

function LogInPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const ariaLabel = { "aria-label": "description" };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    await authService.signup(email, password, name);
    // } catch (error) {
    //   console.log("why?");
    //   console.error(error);
    // }
    setEmail("");
    setPassword("");
    setName("");
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    await authService.login(email2, password2, (param) => {
      dispatch(setAuth(param));
      dispatch(setLoggedIn(true));
      navigate("/");
    });
    setEmail2("");
    setPassword2("");
  };

  return (
    <>
      <div className="mt-40"></div>
      <div className="flex justify-center ">
        <form action="" className="px-10" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            required
            className="border-2  block h-16 rounded-xl w-[300px] my-7 p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="name"
            name="name"
            value={name}
            required
            className="border-2  block h-16 rounded-xl w-[300px] my-7 p-2"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
             
            required
            className="border-2 h-16 rounded-xl w-[300px] block my-7 p-2"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-500 w-20 h-10 text-white hover:text-black hover:bg-white"
          >
            {" "}
            Sign Up
          </button>
        </form>
        <form action="">
          <input
            value={email2}
            type="email"
            name="email"
             
            required
            className="border-2  block h-16 rounded-xl w-[300px] my-7 p-2"
            placeholder="Email"
            onChange={(e) => setEmail2(e.target.value)}
          />
          <input
            value={password2}
            type="password"
            name="password"
             
            required
            className="border-2 h-16 rounded-xl w-[300px] block my-7 p-2"
            placeholder="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button
            onClick={handleSubmit2}
            type="submit"
            className="bg-gray-500 w-20 h-10 text-white hover:text-black hover:bg-white"
          >
            {" "}
            Log In
          </button>
        </form>
      </div>
    </>
  );
}

export default LogInPage;
