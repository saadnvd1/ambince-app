import { Button, Checkbox, Form, Input, Layout } from "antd";
import React, { useEffect } from "react";
import "auth/Auth.css";
import { checkLoggedIn, login, register } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import useToast from "hooks/useToast";
import LBox from "components/LBox/LBox";
import Logo from "images/logo-full.jpg";
import Footer from "Footer";

const Auth = ({ type }) => {
  const { toastError } = useToast();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const from = state?.from || "/";

  useEffect(() => {
    if (user) return;

    dispatch(checkLoggedIn());
  }, []);

  const handleSubmit = (values) => {
    const action = type === "login" ? login : register;
    dispatch(action({ email: values.email, password: values.password }))
      .unwrap()
      .catch(() => {
        toastError("Sorry, that doesn't seem right. Try again.");
      });
  };

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <Layout style={{ height: "100vh" }} className="Auth">
        <div className="login-form-card-container">
          <a href="/">
            <img
              src={Logo}
              style={{
                width: 150,
                marginTop: 0,
                marginBottom: 20,
              }}
            />
          </a>
          <h1 style={{ marginBottom: 20 }}>{`${
            type === "login" ? "Welcome Back! 🎉" : "Hi, Welcome to Ambince 👋"
          }`}</h1>
          <div style={{ marginBottom: 20 }}>
            {type === "signup" && <p>Let's create you a new account</p>}
            {type === "login" && <p>Let's get you signed into your account</p>}
            <div style={{ marginTop: 16 }}>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter an e-mail",
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder={"Email Address"} />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a password",
                    },
                  ]}
                >
                  <Input.Password placeholder={"Password"} />
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" style={{ width: "100%" }}>
                    {type === "login" ? "Sign In" : "Get Started"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          {type === "signup" && (
            <p style={{ fontSize: 10, padding: 0 }}>
              <Link to={"/login"}>Already registered? Login Here</Link>
            </p>
          )}
          {type === "login" && (
            <p style={{ fontSize: 10, padding: 0 }}>
              <Link to={"/signup"}>New? Signup Here</Link>
            </p>
          )}
        </div>
        <div className="auth-quote">
          <q>
            When we strive to become better than we are, everything around us
            becomes better too
          </q>
          <p style={{ fontSize: 10, marginTop: 10 }}>- Paulo Coelho</p>
        </div>
      </Layout>
      <Footer />
    </>
  );
};
export default Auth;
