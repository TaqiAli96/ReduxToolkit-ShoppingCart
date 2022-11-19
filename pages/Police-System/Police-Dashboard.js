import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import HotelIcon from "@mui/icons-material/Hotel";
import axios from "axios";
import ChangePassword from "./Change-Password";

export default function PoliceDashboard() {
  const [policeData, setPoliceData] = useState(null);
  const [summary, setSummary] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("policeToken");
    router.push("/Police-System/Police-Login");
  };

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("policeToken");
  }

  const api = "https://fyp-tenant.herokuapp.com/api/police/dashboard";

  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setPoliceData(response.data.station);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="tenant-first-div">
        <Grid container className="tenant-dashboard-container">
          <Grid item lg={2} className="lg-2">
            <Paper elevation={10} className="dashboard-tenant-paper">
              <div className="Content">
                <h6 className="TRVS" id="logo">
                  T
                </h6>
                <h6 className="TRVS" id="logo">
                  R
                </h6>

                <h6 className="TRVS" id="logo">
                  V
                </h6>

                <h6 className="TRVS" id="logo">
                  S
                </h6>
              </div>
              <div className="police-tenants">
                <div style={{ marginTop: "6px" }}>
                  <PersonIcon sx={{ color: "#FFFAF0", fontSize: "25px" }} />
                </div>
                <div style={{ marginLeft: "-3px" }}>
                  <Typography
                    variant="p"
                    style={{
                      marginLeft: "-2px",
                      fontSize: "25px",
                      letterSpacing: "1px",
                    }}
                    color={"white"}
                    onClick={() =>
                      router.push("/Police-System/Tenants/Tenants")
                    }
                  >
                    Tenants
                  </Typography>
                </div>
              </div>
              <div className="police-Hotels">
                <div style={{ marginTop: "2px" }}>
                  <HotelIcon sx={{ color: "#FFFAF0", fontSize: "25px" }} />
                </div>
                <Typography
                  variant="p"
                  style={{
                    marginLeft: "-2px",
                    fontSize: "25px",
                    letterSpacing: "1px",
                  }}
                  color={"white"}
                  onClick={() =>
                    router.push("/Police-System/Hotels/Hotel-Information")
                  }
                >
                  Hotels
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item lg={10} marginTop={"30px"}>
            <div className="welcome-tenant">
              <div>
                <Typography variant="h6" className="Dashboard-Heading">
                  Police Dashboard
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

            <div className="your-information-section">
              <Grid container>
                <Grid item lg={4}></Grid>
                <Grid item lg={4}></Grid>
                <Grid item lg={4}></Grid>
                <Grid item lg={1}></Grid>
                <Grid item lg={6}>
                  <Paper elevation={10} className="paper">
                    <div className="main-div">
                      <div
                        className="information-heading"
                        style={{
                          background: "gainsboro",
                          marginTop: "-10px",
                        }}
                      >
                        <h2
                          style={{
                            marginLeft: "50px",
                          }}
                        >
                          Station Information
                        </h2>
                        <div className="person-icon">
                          <PersonIcon />
                        </div>
                      </div>
                      {policeData ? (
                        <div className="tenant-information">
                          <div className="info">
                            <Grid container>
                              <Grid item lg={6}>
                                <p>Station Name : {policeData.station_name}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p>SHO Name : {policeData.sho_name}</p>
                              </Grid>

                              <Grid
                                item
                                lg={6}
                                display={"flex"}
                                alignItems={"center"}
                              >
                                <p>Station Email : {policeData.email}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p>Station Address : {policeData.address}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p> SHO Cnic :{policeData.sho_cnic}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p>Station Phone : {policeData.phone}</p>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <p> No Data</p>
                        </div>
                      )}
                    </div>
                  </Paper>
                </Grid>
                <Grid
                  item
                  lg={5}
                  display={"flex"}
                  justifyContent={"center"}
                  marginTop={"5%"}
                >
                  <ChangePassword />
                </Grid>

                <Grid item lg={1}></Grid>
                <Grid item lg={6} className="residency-col">
                  <Paper elevation={10} className="paper-2">
                    <div className="main-div">
                      <div
                        className="information-heading"
                        style={{ background: "gainsboro" }}
                      >
                        <h2
                          style={{
                            marginLeft: "50px",
                          }}
                        >
                          Summary{" "}
                        </h2>
                        <div className="person-icon">
                          <PersonIcon />
                        </div>
                      </div>
                      {summary ? (
                        <div className="tenant-information">
                          <div className="info">
                            <Grid container>
                              <Grid item lg={6}>
                                <p>New Tenants : {summary.newTenants}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p>Total Tenants : {summary.tenantsList}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p>New Hotels : {summary.newHotels}</p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p>Total Hotels : {summary.hotelList} </p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p>
                                  {" "}
                                  Inactive Guests : {summary.guestHistory}{" "}
                                </p>
                              </Grid>
                              <Grid item lg={6}>
                                {" "}
                                <p>
                                  Inactive Tenants : {summary.tenantHistory}{" "}
                                </p>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      ) : (
                        <div className="no-info">
                          <p>Summary Not Found</p>
                        </div>
                      )}
                    </div>
                  </Paper>
                </Grid>
                <Grid item lg={5}></Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
