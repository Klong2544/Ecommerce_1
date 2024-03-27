import axios from "axios";
export const getOrderAdmin = async (authtoken) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/admin-order", {
    headers: {
      authtoken,
    },
  });

export const updateStatusOrder = async (authtoken, orderstatus, id) =>
  await axios.put(
    import.meta.env.VITE_REACT_APP_API + "/admin/order-status",
    { id, orderstatus },
    {
      headers: {
        authtoken,
      },
    }
  );
export const removeOrderAdmin = async (authtoken, orderId) =>
  await axios.delete(
    import.meta.env.VITE_REACT_APP_API + "/admin-order/" + orderId,
    {
      headers: {
        authtoken,
      },
    }
  );
export const readOrderadmin = async (authtoken, orderId) =>
  await axios.get(
    import.meta.env.VITE_REACT_APP_API + "/admin-order/" + orderId,
    {
      headers: {
        authtoken,
      },
    }
  );
