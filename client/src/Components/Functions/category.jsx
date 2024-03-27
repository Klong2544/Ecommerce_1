import axios from "axios";

export const createCategory = async (authtoken, datacategory) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/category",
    datacategory,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getallcategory = async () =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/category");

export const removecategory = async (authtoken, id) =>
  await axios.delete(import.meta.env.VITE_REACT_APP_API + "/category/" + id, {
    headers: {
      authtoken,
    },
  });
export const readcategory = async (authtoken, id) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/category/" + id, {
    headers: {
      authtoken,
    },
  });

export const updatecategory = async (authtoken, id, category) =>
  await axios.put(
    import.meta.env.VITE_REACT_APP_API + "/category/" + id,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
