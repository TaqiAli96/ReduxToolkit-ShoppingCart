import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import NavBar from "../Landing-Pages/Nav-Bar";
import Alert from "@mui/material/Alert";

let status;
let message;

export default function TenantLogin() {
  const Para = ({ data }) => {
    return <p style={{ color: "red", marginTop: "2px" }}>{data}</p>;
    // console.log(data);
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const SuccessAlert = () => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        Successfully Logged in
      </Alert>
    );
  };
  const ErrorAlert = ({ data }) => {
    return (
      <Alert severity="error" sx={{ marginBottom: "20px" }}>
        {data}
      </Alert>
    );
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://fyp-tenant.herokuapp.com/api/tenant/login",
        {
          email: data.username,
          password: data.password,
        }
      );

      console.log(response.data);
      const responseData = response.data.token;

      localStorage.setItem("tenantToken", responseData);

      router.push("/Tenant-System/Tenant-Dashboard");
      status = response.data.status;
    } catch (error) {
      status = error.response.data.status;
      message = error.response.data.message;
    }
    reset();
  };

  return (
    <>
      <div className="login-background">
        <NavBar />
        <div className="header-bg">
          <Grid container className="login-container">
            <Paper elevation={10} className="paper-style-login">
              <Grid align="center">
                <Avatar className="avatar">
                  <PersonIcon className="icon" />
                </Avatar>
                <h4 className="login-head">Sign In</h4>
              </Grid>
              <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                {status === "fail" && <ErrorAlert data={message} />}
                {status === "success" && <SuccessAlert />}

                <TextField
                  id="standard-basic1"
                  label="Username"
                  variant="standard"
                  fullWidth
                  className="text_field"
                  sx={{
                    input: { color: "#fff" },
                  }}
                  InputLabelProps={{ className: "textField_label" }}
                  required
                  type="email"
                  {...register("username", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.username && <Para data={errors.username.message} />}

                <TextField
                  id="standard-basic2"
                  label=" Password"
                  variant="standard"
                  fullWidth
                  required
                  InputLabelProps={{ className: "textField_label" }}
                  className="text_field"
                  sx={{
                    input: { color: "#fff" },
                  }}
                  type="text"
                  {...register("password", {
                    required: "This field is required",
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      message:
                        "must contain minimum 8 characters, one Lowercase & uppercase letter & atleast 1 number",
                    },
                  })}
                />
                {errors.password && <Para data={errors.password.message} />}

                <Button
                  className="btnStyle"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign In
                </Button>
              </form>

              <Typography className="signup-link">
                Don't have an account?
                <Link
                  className="link"
                  onClick={() => router.push("/Tenant-System/Tenant-SignUp")}
                >
                  Sign Up
                </Link>
              </Typography>
              <Link
                className="link"
                onClick={() => router.push("/Tenant-System/Forgot-Password")}
              >
                Forgot Password ?
              </Link>
            </Paper>
          </Grid>
        </div>
      </div>
    </>
  );
}
