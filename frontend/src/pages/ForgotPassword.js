import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layouts/Spinner";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/forgotpassword", values);
      setLoading(false);
      message.success(data.message || "Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        {loading && <Spinner />}
        <Form className="bg-white shadow-lg rounded-xl p-8 w-96" layout="vertical" onFinish={submitHandler}>
          <h1 className="text-xl font-bold">Reset Password</h1>
          <Form.Item 
            label="Email" 
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item 
            label="New Password" 
            name="newPassword"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item 
            label="Confirm Password" 
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[{ required: true, message: 'Please confirm your new password' }, ({ getFieldValue }) => ({ validator(_, value) { return value && value === getFieldValue("newPassword") ? Promise.resolve() : Promise.reject("Passwords do not match"); } })]}
          >
            <Input type="password" />
          </Form.Item>
          <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">Reset Password</button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;