import { Button, Checkbox, Form, Input, Layout } from "antd";
import React, { useEffect, useState } from "react";
import "auth/Auth.css";
import { checkLoggedIn, login, register, requestCode } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import useToast from "hooks/useToast";
import LBox from "components/LBox/LBox";
import Logo from "images/logo-full.jpg";
import Footer from "Footer";

const Auth = ({ type }) => {
  const [verifyCode, setVerifyCode] = useState(false);

  const { toastError, toastInfo } = useToast();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const from = state?.from || "/";

  useEffect(() => {
    if (user) return;

    dispatch(checkLoggedIn());
  }, []);

  const handleSubmit = (values) => {
    if (type === "signup" && !verifyCode) {
      toastInfo("Please check your e-mail for a verification code");
      setVerifyCode(true);
      dispatch(requestCode(values.email));
    } else {
      const action = type === "login" ? login : register;
      dispatch(
        action({
          email: values.email,
          password: values.password,
          code: values.code,
        })
      )
        .unwrap()
        .catch((error) => {
          console.log("error", error);
          toastError(error.error);
        });
    }
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
                validateTrigger={"onSubmit"}
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

                {verifyCode && (
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: verifyCode,
                        message: "Please enter in a code",
                      },
                    ]}
                  >
                    <Input placeholder={"Verification Code"} />
                  </Form.Item>
                )}

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a password",
                    },
                    {
                      min: 8,
                      message:
                        "Password has to be a minimum of 8 characters long",
                    },
                  ]}
                >
                  <Input.Password placeholder={"Password"} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    {type === "login" ? "Sign In" : "Get Started"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          {type === "signup" && (
            <p style={{ fontSize: 15, padding: 0 }}>
              <Link to={"/login"}>Already registered? Login Here</Link>
            </p>
          )}
          {type === "login" && (
            <p style={{ fontSize: 15, padding: 0 }}>
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
