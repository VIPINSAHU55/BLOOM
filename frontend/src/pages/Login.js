import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layouts/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

 //prevent for login user
 useEffect(() => {
  if (localStorage.getItem("user")) {
    navigate("/userpage");
  }
}, [navigate]);

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form className="bg-white shadow-lg rounded-xl p-6" layout="vertical" onFinish={submitHandler}>
          <h1>Login</h1>

          <Form.Item 
          label="Email" 
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item 
          label="Password" 
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="flex justify-between">
            <Link to="/register" className="text-blue-600 hover:underline">Not a user ? Cleck Here to regsiter</Link>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;