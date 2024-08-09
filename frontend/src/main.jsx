import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./store.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";

import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

import AdminHomeScreen from "./adminScreens/AdminHomeScreen.jsx";
import AdminLogin from "./adminScreens/AdminLogin.jsx";
import UserEdit from './adminScreens/UserEdit.jsx'
import CreateUser from './adminScreens/CreateUser.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admin/home" element={<AdminHomeScreen />} />
        <Route path="/admin/userData/:id" element={<UserEdit />} />
        <Route path="/admin/createUser" element={<CreateUser />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
