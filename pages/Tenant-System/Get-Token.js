// import React from "react";

// export const GetToken = () => {
//   return <div>GetToken</div>;
// };

import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@mui/material/Alert";

let status;
let message;
let email;

export default function GetToken() {
  const Para = ({ data }) => {
    return <p style={{ color: "red", marginTop: "10px" }}>{data}</p>;
  };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  if (typeof window !== "undefined") {
    email = localStorage.getItem("email");
  }
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://fyp-tenant.herokuapp.com/api/tenant/validate",
        {
          email: email,
          password: data.password,
          token: data.token,
        }
      );

      status = response.data.status;
      message = response.data.message;
      router.push("/Tenant-System/Tenant-Login");
    } catch (error) {
      console.log(error);
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
                <h4 className="head">Forgot Password</h4>
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
                  label="Token"
                  variant="standard"
                  fullWidth
                  className="text_field"
                  sx={{
                    input: { color: "#fff" },
                  }}
                  InputLabelProps={{ className: "textField_label" }}
                  required
                  type="email"
                  {...register("token", {
                    required: "Token is required",
                  })}
                />
                {errors.token && <Para data={errors.token.message} />}

                <TextField
                  id="standard-basic2"
                  label="Password"
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
                    required: "password is required",
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      message:
                        "must contain minimum 8 characters, one Lowercase & uppercase letter & atleast 1 number",
                    },
                  })}
                />
                {errors.password && <Para data={errors.password.message} />}

                <TextField
                  id="standard-basic2"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  required
                  InputLabelProps={{ className: "textField_label" }}
                  className="text_field"
                  sx={{
                    input: { color: "#fff" },
                  }}
                  type="text"
                  {...register("confirm_password", {
                    required: "Confirm password is required",
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      message:
                        "must contain minimum 8 characters, one Lowercase & uppercase letter & atleast 1 number",
                    },
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords doesn't match";
                      }
                    },
                  })}
                />
                {errors.confirm_password && (
                  <Para data={errors.confirm_password.message} />
                )}
                <Button
                  className="btnStyle"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Change{" "}
                </Button>
              </form>
            </Paper>
          </Grid>
        </div>
      </div>
    </>
  );
}
