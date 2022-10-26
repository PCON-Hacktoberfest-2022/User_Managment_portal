import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
};

const Form = () => {
  const [user, setUser] = useState(initialState);
  const [file, setFile] = useState("");

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({ ...user, [name]: value });
    console.log(value);
  };

  const createUserHandler = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const imageRes = await fetch("http://localhost:5000/post-image", {
      method: "POST",
      body: formData,
    });

    let imagePath = await imageRes.json();
    let filePath = imagePath.filePath;
    console.log(typeof filePath);
    console.log(filePath);

    const res = await fetch("http://localhost:5000/users/add-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        avatar: filePath,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success === 1) {
      toast("User created successfully");
      setUser(initialState);
    } else toast("User creation failed");
  };

  return (
    <div className="inputFields">
      <ToastContainer position="bottom-right" newestOnTop />
      <div className="nameField">
        <TextField
          required
          fullWidth
          size="small"
          id="outlined-required"
          label="First Name"
          value={user.first_name}
          name="first_name"
          onChange={inputChangeHandler}
          //   defaultValue="Hello World"
        />
        <TextField
          required
          fullWidth
          size="small"
          id="last_name"
          label="Last Name"
          value={user.last_name}
          name="last_name"
          onChange={inputChangeHandler}
          //   defaultValue="Hello World"
        />
      </div>
      <div className="emailField">
        <TextField
          required
          fullWidth
          size="small"
          id="outlined-required"
          label="Email"
          value={user.email}
          name="email"
          onChange={inputChangeHandler}
          //   defaultValue="Hello World"
        />
      </div>
      <input
        type={"file"}
        value={user.avatar}
        onChange={(e) => {
          setUser((prevState) => {
            return {
              ...prevState,
              avatar: e.target.value,
            };
          });
          setFile(e.target.files[0]);
        }}
        name="avatar"
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={createUserHandler}
      >
        Create user
      </Button>
    </div>
  );
};

export default Form;
