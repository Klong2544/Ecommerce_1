import axios from "axios";

export const createProduct = async (authtoken, values) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/product", values, {
    headers: {
      authtoken,
    },
  });
export const getAllProduct = async (count) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/products/" + count);

export const removeProduct = async (authtoken, id) =>
  await axios.delete(import.meta.env.VITE_REACT_APP_API + "/product/" + id, {
    headers: {
      authtoken,
    },
  });

export const readProduct = async (id) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/product/" + id);

export const updarteProduct = async (authtoken, id, values) =>
  await axios.put(
    import.meta.env.VITE_REACT_APP_API + "/product/" + id,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );

export const searchProduct = async (arg) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/search/product", arg);

export const listByProduct = async (sort, order, limit) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/newproduct", {
    sort,
    order,
    limit,
  });
