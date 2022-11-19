import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

let status;
let message;

export default function addGuest() {
  const router = useRouter();
  const Para = ({ data }) => {
    return <p style={{ color: "red" }}>{data}</p>;
  };

  //FORM-HOOK
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const SuccessAlert = () => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        Guest Added Successfully
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
  //GET TOKEN & ID FROM LOCAL STORAGE

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("hotelToken");
  }
  //POST-API

  const url = " https://fyp-tenant.herokuapp.com/api/hotel/guest";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        url,

        {
          guest: {
            name: data.name,
            cnic: data.cnic,
            phone: data.phone,
            room: data.room_no,
          },
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(response.data);
      status = response.data.status;

      // router.push("/Hotel-System/Hotel-Dashboard");
    } catch (error) {
      status = error.response.data.status;
      message = error.response.data.message;
    }
    reset();
  };
  return (
    <div className="addGuest-background">
      <div className="header-bg">
        <Paper elevation={10} className="add-guest-paper">
          <Grid container>
            <Grid item lg={12} textAlign="center">
              <div
                style={{
                  width: "80%",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <div>
                  <PersonIcon sx={{ color: "#000" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                  }}
                >
                  Add Guest
                </div>
              </div>

              {/* form */}
              <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                {status === "success" && <SuccessAlert />}
                {status === "fail" && <ErrorAlert data={message} />}
                <Grid container align="center" padding={"40px"}>
                  <Grid item lg={6} marginBottom={"20px"} padding={"0px 10px"}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      // sx={{
                      //   input: { color: "#fff" },
                      // }}
                      // className="text_field"
                      // InputLabelProps={{ className: "textField_label" }}
                      fullWidth
                      // autoComplete="on"
                      required
                      type="text"
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

                  <Grid item lg={6} marginBottom={"20px"} padding={"0px 10px"}>
                    <TextField
                      id="outlined-basic"
                      label="Cnic"
                      variant="outlined"
                      required
                      // autoComplete="on"
                      fullWidth
                      // sx={{
                      //   input: { color: "#fff" },
                      // }}
                      // className="text_field"
                      // InputLabelProps={{ className: "textField_label" }}
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
                  <Grid item lg={6} marginBottom={"20px"} padding={"0px 10px"}>
                    <TextField
                      id="outlined-basic"
                      label="Room No"
                      fullWidth
                      // sx={{
                      //   input: { color: "#fff" },
                      // }}
                      // className="text_field"
                      // InputLabelProps={{ className: "textField_label" }}
                      variant="outlined" // autoComplete="on"
                      required
                      {...register("room_no", {
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
                      type="number"
                    />
                    {errors.room_no && <Para data={errors.room_no.message} />}
                  </Grid>
                  <Grid item lg={6} marginBottom={"20px"} padding={"0px 10px"}>
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                      required
                      // sx={{
                      //   input: { color: "#fff" },
                      // }}
                      // className="text_field"
                      // InputLabelProps={{ className: "textField_label" }}
                      // autoComplete="on"
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
                  <Grid item lg={12} textAlign="center">
                    <div style={{ marginTop: "10px" }}>
                      <Button variant="contained" type="submit">
                        Add
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

{
  /* <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="DialogTitle">
          <Typography variant="p">
            Add Guest
            <PersonIcon sx={{ marginLeft: "10px" }} />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="DialogContentText">
            <form
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container align="center" padding={"10px"}>
                <Grid item lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    required
                    type="text"
                    variant="outlined"
                    {...register("name", {
                      required: "please enter name ",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                  />
                </Grid>
                <br />
                <br />
                <br />
                <Grid item lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Cnic"
                    variant="outlined"
                    required
                    type="text"
                    {...register("cnic", {
                      required: "please enter cnic",
                    })}
                    error={!!errors?.cnic}
                    helperText={errors?.cnic ? errors.cnic.message : null}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Room No"
                    variant="outlined"
                    required
                    {...register("room_no", {
                      required: "please enter cnic",
                    })}
                    type="text"
                    error={!!errors?.room_no}
                    helperText={errors?.room_no ? errors.room_no.message : null}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    required
                    type="text"
                    {...register("phone", {
                      required: "please enter phone no",
                    })}
                    error={!!errors?.phone}
                    helperText={errors?.phone ? errors.phone.message : null}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingRight: "30px" }}>
          <Button onClick={handleClose} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog> */
}
{
  /* Form Modal End Here */
}
