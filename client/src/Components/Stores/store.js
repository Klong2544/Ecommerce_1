import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { userSearch } from "./userSearch";
import { userCart } from "./userCart";
import { userDrawer } from "./userDrawer";

export const store = configureStore({
  reducer: {
    user: userSlice,
    search: userSearch,
    cart:userCart,
    drawer:userDrawer
  },
});
