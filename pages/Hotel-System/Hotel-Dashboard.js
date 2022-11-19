import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ChangePassword from "./Change-Password";
import axios from "axios";
import ListIcon from "@mui/icons-material/List";
import HistoryIcon from "@mui/icons-material/History";

let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("hotelToken");
}

export default function HotelDashboard() {
  const [hotelData, setHotelData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [verified, setVerified] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const api = "https://fyp-tenant.herokuapp.com/api/hotel/dashboard";

  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setHotelData(response.data.hotel);
      setOwnerData(response.data.owner);
      setVerified(response.data.hotel.isVerified);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("hotelToken");
    router.push("/Hotel-System/Hotel-Login");
  };
  return (
    <>
      <div className="tenant-first-div">
        <Grid container className="tenant-dashboard-container">
          <Grid item lg={2} className="lg-2">
            <Paper elevation={10} className="dashboard-tenant-paper">
              <div className="Content">
                <div className="side-navbar">
                  <div className="logo-head">T</div>
                  <div className="logo-head">R</div>
                  <div className="logo-head">V</div>
                  <div className="logo-head">S</div>
                </div>
              </div>

              <div
                className="guest"
                onClick={() => router.push("/Hotel-System/Add-Guest")}
              >
                <div className="hotel-guest">
                  <AddIcon sx={{ fontSize: "25px" }} />
                </div>
                <Typography variant="p" style={{ fontSize: "25px" }}>
                  Add Guest
                </Typography>
              </div>
              <div
                className="guest-1"
                onClick={() => router.push("/Hotel-System/Guest-List/Index")}
              >
                <div className="hotel-guest-1">
                  <ListIcon sx={{ fontSize: "25px" }} />
                </div>
                <Typography variant="p" style={{ fontSize: "25px" }}>
                  Guest List
                </Typography>
              </div>
              <div
                className="guest-2"
                onClick={() =>
                  router.push("/Hotel-System/Guest-History/IndexTwo")
                }
              >
                <div className="hotel-guest-1">
                  <HistoryIcon sx={{ fontSize: "25px" }} />
                </div>
                <Typography variant="p" style={{ fontSize: "25px" }}>
                  Guest History
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item lg={10} marginTop={"30px"}>
            <div className="welcome-tenant">
              <div>
                <Typography variant="h6" className="Dashboard-Heading">
                  Hotel Dashboard
                </Typography>
              </div>
              <div className="logout-icon">
                <Button
                  variant="contained"
                  className="logout-button"
                  onClick={() => logOut()}
                >
                  logout
                  <LogoutIcon sx={{ marginLeft: "5px" }} />
                </Button>
              </div>
            </div>

            <div className="hotel-container">
              <Grid container>
                <Grid item lg={1}></Grid>
                <Grid item lg={6}>
                  <Paper elevation={10} className="paper">
                    <div className="main-div">
                      <div
                        className="information-heading"
                        style={{
                          background: "rgb(225 225 225)",
                          marginTop: "-10px",
                        }}
                      >
                        <h2 className="hotel-info">Hotel Information</h2>
                        <div className="person-icon">
                          <PersonIcon sx={{ color: "#000" }} />
                        </div>
                        <div style={{ marginLeft: "40%" }}>
                          {verified ? (
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <div className="hotel-verification">
                                <VerifiedUserIcon />
                              </div>
                              <div>
                                <p style={{ color: "green" }}>Verified</p>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <div className="hotel-verification-2">
                                <GppMaybeIcon />
                              </div>
                              <div>
                                <p style={{ color: "red" }}>Not Verified</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {hotelData ? (
                        <div className="tenant-information">
                          <div className="info">
                            <Grid container align="center">
                              <Grid item lg={6}>
                                <p> Hotel Name : {hotelData.hotel_name}</p>
                              </Grid>
                              <Grid item lg={6} textAlign="center">
                                <p>Phone : {hotelData.phone}</p>
                              </Grid>
                              <Grid item lg={6} textAlign="center">
                                {" "}
                                <p>Station :{hotelData.station.station_name}</p>
                              </Grid>

                              <Grid item lg={6}>
                                <p> Total Rooms : {hotelData.totalRooms}</p>
                              </Grid>
                              <Grid item lg={6} textAlign="center">
                                <p> Current Guests : {hotelData.totalGuests}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p> Address : {hotelData.address}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p> Email : {hotelData.email}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p>
                                  {" "}
                                  Vacant Rooms :{" "}
                                  {hotelData.totalRooms - hotelData.totalGuests}
                                </p>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      ) : (
                        <div className="no-info">
                          <p>No information</p>
                        </div>
                      )}
                    </div>
                  </Paper>
                </Grid>
                <Grid item lg={5} className="change-password-grid">
                  <ChangePassword />
                </Grid>

                <Grid item lg={1}></Grid>
                <Grid item lg={6} align="center" style={{ marginTop: "-13%" }}>
                  <Paper elevation={10} className="paper">
                    <div className="main-div">
                      <div className="information-heading">
                        <h2 className="hotel-owner-info">Owner Information</h2>
                        <div className="person-icon">
                          <PersonIcon sx={{ color: "#000" }} />
                        </div>
                      </div>
                      {ownerData ? (
                        <div className="tenant-information">
                          <div className="info">
                            <Grid container>
                              <Grid item lg={6}>
                                <p> Name : {ownerData.own_name}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p>Cnic : {ownerData.own_cnic}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p> Father :{ownerData.own_father}</p>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      ) : (
                        <div className="no-info">
                          <p>No information</p>
                        </div>
                      )}
                    </div>
                  </Paper>
                </Grid>
                <Grid item lg={3}></Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
