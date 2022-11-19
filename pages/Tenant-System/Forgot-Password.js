import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";

let status;
let message;

export default function ForgotPassword() {
  const Para = ({ data }) => {
    return <p style={{ color: "red", marginTop: "2px" }}>{data}</p>;
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
  const SuccessAlert = ({ data }) => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        {data}
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
    localStorage.setItem("email", data.email);

    try {
      const response = await axios.post(
        "https://fyp-tenant.herokuapp.com/api/tenant/forgetpass",
        {
          email: data.email,
        }
      );
      status = response.data.status;
      message = response.data.message;
      router.push("/Tenant-System/Get-Token");
    } catch (error) {
      status = error.response.data.status;
      message = error.response.data.message;
    }
    reset();
  };

  return (
    <>
      <div className="login-background">
        <div className="header-bg">
          <Grid container className="login-container">
            <Paper elevation={10} className="paper-style-login">
              <Grid align="center">
                <AccountCircleIcon className="circle-icon" />
                <h4 className="head">Forgot Password </h4>
              </Grid>
              <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                {status === "success" && <SuccessAlert data={message} />}
                {status === "fail" && <ErrorAlert data={message} />}
                <TextField
                  id="standard-basic1"
                  label="email"
                  variant="standard"
                  fullWidth
                  className="text_field"
                  sx={{
                    input: { color: "#fff" },
                  }}
                  InputLabelProps={{ className: "textField_label" }}
                  required
                  type="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && <Para data={errors.email.message} />}

                <Button
                  className="btnStyle"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Get Token{" "}
                </Button>
              </form>
            </Paper>
          </Grid>
        </div>
      </div>
    </>
  );
}
