import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Home({ currentUser, setUser }) {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ userName, password });
    if (isLogin) {
      // api call for login
      const res = await axios
        .post(
          "http://localhost:5000/login",
          { userName, password },
          {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          setUser({ userName: res.data.userName });
          navigate("/users");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      // api call for register
      const res = await axios
        .post(
          "http://localhost:5000/register",
          { userName, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          setUser({ userName: res.data.userName });
          navigate("/users");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        ></input>
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br />
        <div>
          <button type="submit">Register</button>
          <br />
          <button type="submit" onClick={() => setIsLogin(true)}>
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default Home;
