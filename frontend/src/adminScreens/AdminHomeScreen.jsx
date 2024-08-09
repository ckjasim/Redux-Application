import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAdminLogoutMutation,
  useUserDetailsQuery,
  useDeleteUserMutation,
} from "../slices/adminApiSlice.js";
import { adminLogout } from "../slices/adminAuthSlice.js";
import "./AdminHome.css";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useAdminLogoutMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: userData, error, isLoading } = useUserDetailsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (id) => {
    try {
      navigate(`/admin/userData/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const data = await deleteUser(id);
      toast.success("User Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const createHandler = async (id) => {
    try {
      navigate("/admin/createUser");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = userData?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="center-div">
        <h1>Admin Welcome</h1>

       
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <table id="myTable">
          <thead>
            <tr className="header">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.image?.url}
                        alt=""
                        style={{
                          height: "100%",
                          width: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => editHandler(item._id)}>Edit</button>
                  </td>

                  <td>
                    <button onClick={() => deleteHandler(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Users not found</td>
              </tr>
            )}
          </tbody>
        </table>

        <br />
        <button onClick={createHandler}>Create User</button>
        <br />
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default HomeScreen;
