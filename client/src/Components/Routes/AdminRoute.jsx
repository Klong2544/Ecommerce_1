// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { currentAdmin } from "../Functions/auth";
import { useSelector } from "react-redux";
import Nouser from "../error404/Nouser";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [pass, setpass] = useState(false);
  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
        .then((res) => {
          setpass(true);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          setpass(false);
        });
    }
  }, [user]);
  return pass ? (
    children
  ) : (
    <Nouser/>
  );
};

export default AdminRoute;
