import React, { useState, useEffect , } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useEditUserMutation } from "../slices/adminApiSlice.js";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader.jsx";
import { setCredentials } from "../slices/authSlice.js";
import { useUserDataMutation } from "../slices/adminApiSlice.js";

const UserEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  const [findUser,]=useUserDataMutation()
  const [updateProfile,{isLoading}]=useEditUserMutation()

const {id}=useParams()


const previewFile = (e) => {
  const file = e.target.files[0];
  setFileToBase(file);
};

const setFileToBase = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImage(reader.result);
  };
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await findUser(id);
        setName(data.name);
        setEmail(data.email);
        setImage(data.image?.url)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [findUser, id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id:id,
          name,
          email,
          password,
          image
        }).unwrap()
        navigate("/admin/home");
        toast.success('profile Updated')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update User</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={previewFile}></Form.Control>
          {image && <img src={image} value={image} height="200" alt="Image preview" className="mt-3" />}
        </Form.Group>

{isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserEdit;
