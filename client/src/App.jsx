// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Components/Home";
//store
import { login } from "./Components/Stores/userSlice";
//Page
import Register from "./Components/Pages/auth/Register";
import Login from "./Components/Pages/auth/Login";
import Product from "./Components/Pages/users/Product";

//admin
import HomeAdmin from "./Components/Pages/admin/HomeAdmin";
import ManageAdmin from "./Components/Pages/admin/ManageAdmin";
import CreateCategory from "./Components/Pages/admin/category/CreateCategory";
import CreateProduct from "./Components/Pages/admin/product/CreateProduct";
import UpdateProduct from "./Components/Pages/admin/product/UpdateProduct";
import Order from "./Components/Pages/admin/Order";

//user
import HomeUser from "./Components/Pages/users/HomeUser";
import UserRoute from "./Components/Routes/UserRoute";
import Shop from "./Components/Pages/users/Shop";
import Cart from "./Components/Pages/users/Cart";
import ChackOut from "./Components/Pages/users/ChackOut";
import History from "./Components/Pages/users/History";
import InfomationUser from "./Components/Pages/users/InfomationUser";
//auth
import { currentUser } from "./Components/Functions/auth";

//Route
import AdminRoute from "./Components/Routes/AdminRoute";
const App = () => {
  const idToken = localStorage.token;
  const dispatch = useDispatch();
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        console.log(res.data);
        dispatch(
          login({
            email: res.data.email,
            username: res.data.username,
            role: res.data.role,
            token: idToken,
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />

        {/*Admin*/}
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-order"
          element={
            <AdminRoute>
              <Order />
            </AdminRoute>
          }
        />
        {/*User */}
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
        <Route
          path="/chackout"
          element={
            <UserRoute>
              <ChackOut />
            </UserRoute>
          }
        />
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        <Route
          path="/user/information"
          element={
            <UserRoute>
              <InfomationUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
