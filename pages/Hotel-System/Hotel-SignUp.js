import React, { useState, useEffect } from "react";
import NavBar from "../Landing-Pages/Nav-Bar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Alert from "@mui/material/Alert";

let status;
let message;

export default function HotelSignUp() {
  const [station, setStation] = useState(null);
  const router = useRouter();

  //USE-EFFECT-HOOK
  useEffect(() => {
    fetchData();
  }, []);

  const Para = ({ data }) => {
    return <p style={{ color: "red" }}>{data}</p>;
  };

  const SuccessAlert = () => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        Signup Successfulyy{" "}
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

  //GET API
  const api = "https://fyp-tenant.herokuapp.com/api/hotel/stations";

  const fetchData = async () => {
    try {
      const response = await axios.get(api);
      setStation(response.data.stations);

      // console.log(response.data.stations);
    } catch (error) {
      // console.log(error);
    }
  };

  //Form-Hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://fyp-tenant.herokuapp.com/api/hotel/register",
        {
          email: data.email,
          password: data.password,
          hotel_name: data.hotel_name,
          own_name: data.owner_name,
          own_father: data.owner_father,
          own_cnic: data.owner_cnic,
          phone: data.phone,
          address: data.address,
          totalRooms: data.rooms,
          station: data.station,
        }
      );
      const responseData = response.data.token;
      // console.log(response);

      localStorage.setItem("hotelToken", responseData);
      status = response.data.status;

      router.push("/Hotel-System/Hotel-Dashboard");
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

      <div className="header-bg-2">
        <Paper
          elevation={10}
          className="paperStyle"
          id="paperStyle-hotel-sigUp"
        >
          <Grid container className="hotel-signup-heading">
            <Grid item lg={12} textAlign="center">
              <AccountCircleIcon className="circleIcon" />
            </Grid>
            <Grid item lg={12} className="sign-up">
              SignUp{" "}
            </Grid>
          </Grid>

          <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
            {status === "success" && <SuccessAlert />}
            {status === "fail" && <ErrorAlert data={message} />}
            <Grid container align="center" className="hotel-signup-form">
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="hotel_name"
                  placeholder="hotel_name"
                  required
                  fullWidth
                  type="text"
                  variant="outlined"
                  {...register("hotel_name", {
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
                {errors.hotel_name && <Para data={errors.hotel_name.message} />}
              </Grid>
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="owner_name"
                  placeholder="owner_name"
                  required
                  fullWidth
                  type="text"
                  variant="outlined"
                  {...register("owner_name", {
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
                {errors.owner_name && <Para data={errors.owner_name.message} />}
              </Grid>
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="owner cnic"
                  placeholder="00000-0000000-0"
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  {...register("owner_cnic", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]{5}-[0-9]{7}-[0-9]$/,
                      message: "please enter a valid cnic number",
                    },
                  })}
                />
                {errors.owner_cnic && <Para data={errors.owner_cnic.message} />}
              </Grid>
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="owner_father"
                  placeholder=" owner_father"
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  {...register("owner_father", {
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
                {errors.owner_father && (
                  <Para data={errors.owner_father.message} />
                )}
              </Grid>
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="phone"
                  placeholder="923470171977"
                  variant="outlined"
                  required
                  fullWidth
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
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="Email"
                  placeholder="Email"
                  variant="outlined"
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
              <Grid item lg={6} className="hotel-form">
                <TextField
                  label="password"
                  placeholder="password"
                  variant="outlined"
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
              <Grid item lg={6} className="hotel-form">
                <TextField
                  variant="outlined"
                  label="Total Rooms"
                  placeholder="Total Rooms"
                  required
                  fullWidth
                  type="number"
                  {...register("rooms", {
                    required: "This field is required",
                    min: {
                      value: 5,
                      message: "Minimum 5 Rooms",
                    },
                    max: {
                      value: 500,
                      message: "Maximum 500 Rooms",
                    },
                  })}
                />
                {errors.rooms && <Para data={errors.rooms.message} />}
              </Grid>
              <Grid item lg={6} className="hotel-form">
                <TextField
                  variant="outlined"
                  label="Address"
                  placeholder="Address"
                  required
                  fullWidth
                  type="text"
                  rows={3}
                  multiline
                  {...register("address", {
                    required: "This field is required ",
                    minLength: {
                      value: 25,
                      message: " please enter minimum 25 characters",
                    },
                    maxLength: {
                      value: 200,
                      message: " please enter maximum 200 characters ",
                    },
                  })}
                />
                {errors.address && <Para data={errors.address.message} />}
              </Grid>
              {station && (
                <Grid item lg={6} className="hotel-form">
                  <TextField
                    select
                    fullWidth
                    defaultValue=""
                    variant="outlined"
                    label="Choose Station"
                    inputProps={register("station", {
                      required: "This Field is required",
                    })}
                  >
                    {station.map((data) => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.station_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.station && <Para data={errors.station.message} />}
                </Grid>
              )}
              <Grid item lg={12} paddingBottom={"10px"}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}
