import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.jsx";
import { useAdminLoginMutation } from "../slices/adminApiSlice.js";
import { setAdminCredentials } from "../slices/adminAuthSlice.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      console.log(res,'1111111111111')
      if(res){

        navigate('/admin/home')
      }
    } catch (err) {
      toast.error(err?.data?.message ||err.error)
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
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
{isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
