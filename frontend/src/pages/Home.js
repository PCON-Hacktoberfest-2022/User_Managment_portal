import React from "react";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import "./style.css";
import User from "./User";
import Form from "./Form";

// const dumydata = [
//   {
//     id: 123,
//     first_name: "user",
//     last_name: "1",
//     email: "user1@gmail.com",
//     avtar: "https://unsplash.com/photos/WNoLnJo7tS8",
//   },
// ];
const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch("http://localhost:5000/users/get-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsers(data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  //console.log(users);

  //console.log(dumydata);

  return (
    <>
      <Container container maxWidth={"lg"} className="container">
        <div className="title">User List</div>
        <div className="form">
          <Form />
        </div>
        {users &&
          users.map((user) => {
            return (
              <div className="user" key={user._id}>
                <User user={user} />
              </div>
            );
          })}
      </Container>
    </>
  );
};

export default Home;
