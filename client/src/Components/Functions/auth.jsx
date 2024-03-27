import axios from "axios";

export const register = async (values) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/register", values);

export const loginauth = async (values) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/login", values);

export const currentUser = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
export const currentAdmin = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );


