import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layouts/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
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
      <div className="register-page ">
        {loading && <Spinner />}
        <Form className="bg-white shadow-lg rounded-xl p-6" layout="vertical" onFinish={submitHandler}>
          <h1>Register</h1>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input type="name"/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="tel"
            rules={[{ required: true, message: 'Please enter your Mobile Number' }]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input type="password" />
          </Form.Item>

          <div className="flex justify-between">
            <Link to="/login" className="text-blue-600 hover:underline">Already Registered? Click Here to login</Link>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;