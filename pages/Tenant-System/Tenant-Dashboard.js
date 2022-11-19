import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import ChangePassword from "./Change-Password";

let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("tenantToken");
}

export default function TenantDashboard() {
  const router = useRouter();
  const [tenant, setTenant] = useState(null);
  const [residency, setResidency] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const api = "https://fyp-tenant.herokuapp.com/api/tenant/dashboard";

  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setTenant(response.data.tenant);
      console.log(response.data);

      setResidency(response.data.residence);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("tenantToken");
    router.push("/Tenant-System/Tenant-Login");
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
                {residency === null ? (
                  <div
                    className="add-tenant-div"
                    id="add-tenant"
                    onClick={() => router.push("/Tenant-System/Add-Residency")}
                  >
                    <div className="top-margin">
                      <AddIcon className="res-icon" />
                    </div>
                    <div>
                      <Typography variant="p" className="text-Size">
                        Add Residency
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div
                    className="add-tenant-div"
                    id="add-tenant"
                    onClick={() => removeResidency(residency[0]._id)}
                  >
                    <div className="top-margin">
                      <DeleteIcon className="res-icon" />
                    </div>
                    <div>
                      <Typography variant="p" className="text-Size">
                        Remove Residency{" "}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item lg={10} marginTop={"30px"}>
            <div className="welcome-tenant">
              <div>
                <Typography variant="h6" className="Dashboard-Heading">
                  Tenant Dashboard
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
              <Grid container className="tenant-info">
                <Grid item lg={1}></Grid>
                <Grid item lg={6}>
                  <Paper elevation={10} className="paper">
                    {tenant ? (
                      <div className="main-div">
                        <div className="information-heading">
                          <h2 className="info-head">Your Information</h2>
                          <div className="person-icon">
                            <PersonIcon />
                          </div>
                        </div>

                        <div className="tenant-information">
                          <div className="info">
                            <Grid container align="center">
                              <Grid item lg={6}>
                                <p>Tenant Name : {tenant.name}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p>Tenant Father : {tenant.father}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p> Email : {tenant.email}</p>
                              </Grid>

                              <Grid item lg={6}>
                                <p> Cnic : {tenant.cnic}</p>
                              </Grid>
                              <Grid item lg={6}>
                                <p>Phone : {tenant.phone}</p>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ textAlign: "center" }}>Loading .....</p>
                    )}
                  </Paper>
                </Grid>
                <Grid item lg={5} className="change-password-grid">
                  <ChangePassword />
                </Grid>

                <Grid item lg={1}></Grid>
                <Grid item lg={6} className="add-res-grid">
                  <Paper elevation={10}>
                    <div className="add-res-paper">
                      <div className="section-residency">
                        <h2 className="info-head">Residency </h2>
                        {residency &&
                          residency.map((residence) => {
                            const { isVerified } = residence;
                            return (
                              <div className="res-map-section">
                                {isVerified ? (
                                  <div className="res-div1">
                                    <div className="res-div2">
                                      <VerifiedUserIcon
                                        sx={{ color: "green" }}
                                      />
                                    </div>
                                    <div className="res-div3">
                                      <Typography sx={{ color: "green" }}>
                                        Verified
                                      </Typography>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="res-div1">
                                    <div className="res-div2">
                                      <GppMaybeIcon sx={{ color: "red" }} />
                                    </div>
                                    <div className="res-div3">
                                      <Typography sx={{ color: "red" }}>
                                        Not Verified{" "}
                                      </Typography>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    {residency === null ? (
                      <p style={{ textAlign: "center" }}>No Residency Added</p>
                    ) : (
                      residency &&
                      residency.map((residence) => {
                        const {
                          own_name,
                          own_father,
                          own_cnic,
                          own_phone,
                          address,
                        } = residence;

                        return (
                          <Grid
                            container
                            align="center"
                            className="residence-info"
                          >
                            <Grid item lg={6}>
                              <p>Owner Name : {own_name} </p>
                            </Grid>
                            <Grid item lg={6}>
                              <p>Owner Cnic : {own_cnic} </p>
                            </Grid>
                            <Grid item lg={6}>
                              <p>Owner father : {own_father}</p>
                            </Grid>
                            <Grid item lg={6}>
                              <p>Owner phone : {own_phone} </p>
                            </Grid>
                            <Grid item lg={1}></Grid>
                            <Grid item lg={6}>
                              <p>Owner Address : {address}</p>
                            </Grid>
                          </Grid>
                        );
                      })
                    )}
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

function removeResidency(residence) {
  const api = "https://fyp-tenant.herokuapp.com/api/tenant/residence";

  const removeData = async () => {
    try {
      const response = await axios.delete(api, {
        headers: { Authorization: "Bearer " + token },
        data: { residence_ID: residence },
      });
      console.log(response);

      if (response.data.status == "success") {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  removeData();
}
