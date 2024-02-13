import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Users({ currentUser, setUser }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const userData = await res.json();
        setData(userData);
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);

  function handleLogout() {
    setUser(null);
    const res = axios.post(
      "http://localhost:5000/logout",
      {},
      { withCredentials: true }
    );

    navigate("/");
  }

  return (
    <>
      {currentUser && (
        <>
          <h1>welcome {currentUser.userName}</h1>
          <h2>Table</h2>
          <table>
            <thead>
              <tr style={{ background: "green" }}>
                <th style={{ border: "2px solid black" }}>ID</th>
                <th style={{ border: "2px solid black" }}>Name</th>
                <th style={{ border: "2px solid black" }}>Email</th>
                <th style={{ border: "2px solid black" }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((user) => (
                  <tr>
                    <td style={{ border: "2px solid black" }}>{user.id}</td>
                    <td style={{ border: "2px solid black" }}>{user.name}</td>
                    <td style={{ border: "2px solid black" }}>{user.email}</td>
                    <td style={{ border: "2px solid black" }}>{user.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!currentUser && (
        <>
          <h1>You can't access this page without logging in</h1>
          <button onClick={() => navigate("/")}>go back to home</button>
        </>
      )}
    </>
  );
}

export default Users;
