import axios from "axios";

export const getAllUser = async () =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/all-user");

export const changRole = async (authtoken, value) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/chang-role", value, {
    headers: {
      authtoken,
    },
  });

export const changStatus = async (authtoken, value) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/change-status",
    value,
    {
      headers: {
        authtoken,
      },
    }
  );

export const removeuser = async (authtoken, id) =>
  await axios.delete(import.meta.env.VITE_REACT_APP_API + "/user/" + id, {
    headers: {
      authtoken,
    },
  });
export const repassworduser = async (authtoken, id, values) =>
  await axios.put(import.meta.env.VITE_REACT_APP_API + "/user/" + id, values, {
    headers: {
      authtoken,
    },
  });

export const userCart = async (authtoken, cart) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });

export const saveAddress = async (authtoken, address) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/user/address",
    address,
    {
      headers: {
        authtoken,
      },
    }
  );
export const saveOrder = async (authtoken) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/user/order",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const clearOrder = async (authtoken) =>
  await axios.delete(import.meta.env.VITE_REACT_APP_API + "/user/order", {
    headers: {
      authtoken,
    },
  });

export const getOrderUser = async (authtoken) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/user/history", {
    headers: {
      authtoken,
    },
  });

export const addtoWishlist = async (authtoken, productId) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
export const deleteWishlist = async (authtoken, productId) =>
  await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/user/wishlists",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
