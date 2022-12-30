import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import HouseIcon from "@mui/icons-material/House";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@mui/material/Alert";

let status;
let message;
let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("tenantToken");
}

export default function AddResidency() {
  const [station, setStation] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const Para = ({ data }) => {
    return <p style={{ color: "red" }}>{data}</p>;
  };

  const api = "https://fyp-tenant.herokuapp.com/api/tenant/dashboard";

  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setStation(response.data.stations);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const url = "https://fyp-tenant.herokuapp.com/api/tenant/residence";

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        url,
        {
          residence: {
            own_name: data.name,
            own_cnic: data.cnic,
            own_father: data.father,
            own_phone: data.phone,
            address: data.address,
            station: data.station,
            own_address: data.own_address,
          },
        },

        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(response);

      // router.push("/Tenant-System/Tenant-Dashboard");
      status = response.data.status;
      reset();
    } catch (error) {
      status = error.response.data.status;
      message = error.response.data.message;
    }
  };

  return (
    <div className="add-residency-background-image">
      <div className="header-bg">
        <Paper elevation={10} className="residency-paper">
          <Grid container>
            <Grid item lg={12} textAlign="center" className="add-res-head">
              <HouseIcon className="house-icon" />
              <h3 className="add-residency-h3">Add Residency</h3>
            </Grid>
          </Grid>

          <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
            {status === "success" && <SuccessAlert />}
            {status === "fail" && <ErrorAlert data={message} />}

            <Grid container align="center" paddingTop={"15px"}>
              <Grid item lg={6} className="tenant-signup-form">
                <TextField
                  variant="outlined"
                  label="Qwner_name"
                  required
                  placeholder="Owner_name"
                  fullWidth
                  type="text"
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
                  label="Owner_cnic"
                  variant="outlined"
                  placeholder="00000-0000000-0"
                  required
                  fullWidth
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
                  label="Owner_father"
                  variant="outlined"
                  required
                  placeholder="Owner_father"
                  type="text"
                  fullWidth
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
                  label="Phone"
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="923*********"
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
                  id="outlined-multiline-static"
                  variant="outlined"
                  label="Owner Address"
                  multiline
                  rows={3}
                  fullWidth
                  type="text"
                  required
                  {...register("own_address", {
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
                {errors.own_address && (
                  <Para data={errors.own_address.message} />
                )}
              </Grid>
              <Grid item lg={6} className="tenant-signup-form">
                <TextField
                  id="outlined-multiline-static"
                  variant="outlined"
                  label="Address"
                  multiline
                  rows={3}
                  fullWidth
                  type="text"
                  required
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
                <Grid item lg={6} className="tenant-signup-form">
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    defaultValue=""
                    label="Choose_Station"
                    {...register("station", {
                      required: "This field is required",
                    })}
                    sx={{
                      "& .MuiSvgIcon-root .MuiInput-input": {
                        color: "white",
                      },
                    }}
                  >
                    {station.map((data) => (
                      <MenuItem
                        key={data._id}
                        value={data._id}
                        inputProps={{ color: "white" }}
                        className="station_select"
                      >
                        {data.station_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.station && <Para data={errors.station.message} />}
                </Grid>
              )}

              <Grid item lg={12} textAlign="center" padding={"10px"}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
<button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}
