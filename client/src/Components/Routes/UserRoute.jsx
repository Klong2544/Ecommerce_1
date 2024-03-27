// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import Nouser from "../error404/Nouser";

// eslint-disable-next-line react/prop-types
const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.user.token ? (
    children
  ) : (
   <Nouser/>
  );
};

export default UserRoute;
