import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

import Alert from "@mui/material/Alert";

let status;
let message;
export default function NewHotels() {
  const [newHotels, setNewHotels] = useState(null);
  const SuccessAlert = ({ data }) => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        Tenant Verified
      </Alert>
    );
  };

  //POST API
  const postUrl = "https://fyp-tenant.herokuapp.com/api/police/hotels/verify";
  const verifyHotel = async (id) => {
    try {
      const response = await axios.post(
        postUrl,
        {
          hotel_ID: id,
        },

        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      // console.log(response.data);
      status = response.data.status;
      message = response.data.message;
      // alert("Hotel Verified");
      router.push("/Police-System/Hotels/Hotel-List");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("policeToken");
    // console.log(token);
  }

  const api = "https://fyp-tenant.herokuapp.com/api/police/hotels/new";
  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });

      setNewHotels(response.data.hotels);
      console.log(response.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  return (
    <div>
      <Grid container marginTop={"90px"}>
        <Grid item lg={12} align="center">
          <h2 style={{ color: "#40292b", letterSpacing: "1px" }}>
            {" "}
            New Hotels Request : {newHotels && newHotels.length}
          </h2>{" "}
        </Grid>
        <Grid item lg={12} align="center">
          {status === "success" && <SuccessAlert />}
        </Grid>
        <Grid item lg={3}></Grid>
        <Grid item lg={6}>
          {newHotels ? (
            newHotels.map((data) => {
              return (
                <div style={{ marginBottom: "10%" }}>
                  <Paper elevation={10}>
                    <div className="main-div">
                      <div className="information-heading">
                        <h2
                          style={{
                            marginLeft: "50px",
                          }}
                        >
                          Hotel Information
                        </h2>
                        <div className="person-icon">
                          <Tooltip title="verify">
                            <IconButton onClick={() => verifyHotel(data._id)}>
                              <VerifiedUserIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="tenant-information">
                        <div className="info">
                          <Grid container>
                            <Grid item lg={4}>
                              <p>Hotel Name : {data.hotel_name}</p>
                            </Grid>
                            <Grid item lg={4}>
                              <p>Email : {data.email}</p>{" "}
                            </Grid>
                            <Grid item lg={4}>
                              {" "}
                              <p>Phone : {data.phone}</p>
                            </Grid>
                            <Grid item lg={4}>
                              {" "}
                              <p>Total Rooms : {data.totalRooms}</p>
                            </Grid>
                            <Grid item lg={4}>
                              <p>Owner Name : {data.own_name}</p>
                            </Grid>
                            <Grid item lg={4}>
                              {" "}
                              <p>Address : {data.address}</p>
                            </Grid>

                            <Grid item lg={4}>
                              <p>Owner Father : {data.own_father}</p>{" "}
                            </Grid>

                            <Grid item lg={4}>
                              {" "}
                              <p>Owner Cnic : {data.cnic}</p>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>No Data</p>
          )}
        </Grid>
        <Grid item lg={3}></Grid>
      </Grid>
    </div>
  );
}
