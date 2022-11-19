import React from "react";
import Avatar from "@mui/material/Avatar";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Grid, Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

let status;
let message;

export default function ChangePassword() {
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

  const SuccessAlert = () => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        Password Changed Successfully{" "}
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

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("hotelToken");
  }

  const Para = ({ data }) => {
    return <p style={{ color: "red", marginTop: "-16px" }}>{data}</p>;
    // console.log(data);
  };
  //POST-METHOD-CHANGE-PASSWORD

  const url = "https://fyp-tenant.herokuapp.com/api/hotel/changepass";
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        url,
        {
          oldPass: data.old_password,
          newPass: data.new_password,
        },

        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      console.log(response.data);
      status = response.data.status;

      router.push("/Hotel-System/Hotel-Login");
    } catch (error) {
      status = error.response.data.status;
      message = error.response.data.message;
      console.log(error);
    }
    reset();
  };

  return (
    <div>
      <div style={{ marginTop: "30%" }}>
        <Paper elevation={10} className="paper-style">
          <Grid align="center">
            <Avatar className="avatarStyle">
              <LockResetIcon />
            </Avatar>
            <h4>Change Password</h4>
          </Grid>
          <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
            {status === "success" && <SuccessAlert />}
            {status === "fail" && <ErrorAlert data={message} />}
            <TextField
              id="standard-basic"
              label="old password"
              sx={{ marginBottom: "30px" }}
              fullWidth
              required
              type="text"
              variant="outlined"
              {...register("old_password", {
                required: "This field is required ",
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "must contain minimum 8 characters, one Lowercase & uppercase letter & atleast 1 number",
                },
              })}
            />

            {errors.old_password && <Para data={errors.old_password.message} />}

            <TextField
              id="standard-basic"
              label=" new Password"
              variant="outlined"
              sx={{ marginBottom: "30px" }}
              fullWidth
              required
              type="text"
              {...register("new_password", {
                required: "This field is required ",
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "must contain minimum 8 characters, one Lowercase & uppercase letter & atleast 1 number",
                },
              })}
            />

            {errors.new_password && <Para data={errors.new_password.message} />}

            <TextField
              id="standard-basic"
              label=" confirm Password"
              variant="outlined"
              sx={{ marginBottom: "30px" }}
              fullWidth
              required
              type="text"
              {...register("confirm_password", {
                required: "This field is required  ",
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "must contain minimum 8 characters, one Lowercase & uppercase letter & atleast 1 number",
                },
                validate: (val) => {
                  if (watch("new_password") != val) {
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
              Change
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}
