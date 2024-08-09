import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader.jsx";
import { useCreateUserMutation } from "../slices/adminApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image,setImage]=useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const previewFile = async(e)=>{
    const file = e.target.files[0]
    setFileToBase(file)
  }
  const setFileToBase = (file)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
      setImage(reader.result)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await createUser({ name, email, password,image }).unwrap();
        dispatch(setCredentials({...res}))
        if(res){
          
          navigate("/admin/home");
          toast.success('User created Successfully')
        }
        
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Create User</h1>
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
          <Form.Control
            type="file"
            name='image'
            onChange = {previewFile}
          ></Form.Control>
          {image && <img src={image} height='200' alt="Image preview" /> }
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Create
        </Button>

      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
