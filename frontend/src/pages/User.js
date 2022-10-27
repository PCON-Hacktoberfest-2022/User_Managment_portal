import React from "react";
import { Avatar, Card, CardHeader } from "@mui/material";

const User = ({ user }) => {
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="Cindy Baker"
              src={`http://localhost:5000/${user.avatar}`}
            />
          }
          title={user.firstName + "  " + user.lastName}
          subheader={`Email :  ${user.email}`}
        />
      </Card>
    </>
  );
};

export default User;
