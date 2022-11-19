import React from "react";
import NavBar from "../Landing-Pages/Nav-Bar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import Alert from "@mui/material/Alert";

let status;
let message;

const Para = ({ data }) => {
  return <p style={{ color: "red", marginTop: "2px" }}>{data}</p>;
};
export default function TenantSignUp() {
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
        Residency Added Successfully{" "}
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
        "https://fyp-tenant.herokuapp.com/api/tenant/register",
        {
          email: data.email,
          password: data.password,
          name: data.name,
          father: data.father,
          cnic: data.cnic,
          phone: data.phone,
        }
      );
      // console.log(response.data);
      const responseData = response.data.token;

      localStorage.setItem("tenantToken", responseData);

      status = response.data.status;
      router.push("/Tenant-System/Tenant-Dashboard");
    } catch (error) {
      console.log(error);
      status = error.response.data.status;
      message = error.response.data.message;
    }
    reset();
  };
  return (
    <div className="signUp-background">
      <NavBar />
      <div className="header-bg">
        <div className="tenant-signUp-div">
          <Paper elevation={10} className="paperStyle">
            <Grid container align="center">
              <Grid item lg={12}>
                <AccountCircleIcon className="circleIcon" />
              </Grid>
              <Grid item lg={12} className="sign-up">
                SignUp
              </Grid>
            </Grid>
            <form
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              {status === "success" && <SuccessAlert />}
              {status === "fail" && <ErrorAlert data={message} />}
              <Grid container align="center" className="tenant-grid">
                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    label="Name"
                    required
                    autoComplete="on"
                    placeholder="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    {...register("name", {
                      required: "This field is required",
                      minLength: {
                        value: 4,
                        message: " please enter minimum 4 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: " please enter maximum 30 characters ",
                      },
                    })}
                  />

                  {errors.name && <Para data={errors.name.message} />}
                </Grid>

                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    label="Father"
                    variant="outlined"
                    required
                    placeholder="Father"
                    fullWidth
                    autoComplete="on"
                    type="text"
                    {...register("father", {
                      required: "This field is required",
                      minLength: {
                        value: 4,
                        message: " please enter minimum 4 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: " please enter maximum 30 characters ",
                      },
                    })}
                  />
                  {errors.father && <Para data={errors.father.message} />}
                </Grid>
                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    label="Cnic"
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="00000-0000000-0"
                    type="text"
                    {...register("cnic", {
                      required: "This field is required",
                      pattern: {
                        value: /^[0-9]{5}-[0-9]{7}-[0-9]$/,
                        message: "please enter a valid cnic number",
                      },
                    })}
                  />
                  {errors.cnic && <Para data={errors.cnic.message} />}
                </Grid>
                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    label="Phone"
                    variant="outlined"
                    required
                    placeholder="923*********"
                    fullWidth
                    autoComplete="one"
                    type="text"
                    {...register("phone", {
                      required: "This field is required",
                      pattern: {
                        value: /^\d{12}$/,
                        message: "please enter a valid 12-digit phone number",
                      },
                    })}
                  />

                  {errors.phone && <Para data={errors.phone.message} />}
                </Grid>
                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    label="Email"
                    variant="outlined"
                    placeholder=" Email"
                    autoComplete="on"
                    required
                    fullWidth
                    type="text"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />

                  {errors.email && <Para data={errors.email.message} />}
                </Grid>
                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    variant="outlined"
                    label="Password"
                    placeholder="password"
                    autoComplete="on"
                    required
                    fullWidth
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
                </Grid>

                <Grid item lg={12} className="submit-button">
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>{" "}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}
