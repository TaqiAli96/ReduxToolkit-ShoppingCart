import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

export default function NavBar() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  function TenantLoginPage() {
    router.push("/Tenant-System/Tenant-Login");
  }
  function HotelLoginPage() {
    router.push("/Hotel-System/Hotel-Login");
  }
  function PoliceLoginPage() {
    router.push("/Police-System/Police-Login");
  }

  return (
    <div>
      <AppBar className="app-bar">
        <Toolbar>
          <Grid container padding={"0px 20px"}>
            <Grid item lg={1} className="logo-container">
              <Link
                underline="none"
                className="logo"
                onClick={() => router.push("/Landing-Pages/Main-Landing-Page")}
                style={{ cursor: "pointer" }}
              >
                TRVS
              </Link>
            </Grid>
            <Grid item lg={5}>
              <p
                style={{
                  fontStyle: "italic",
                  color: "#fff",
                  marginTop: "20px",
                  wordSpacing: "1px",
                  letterSpacing: "1px",
                }}
              >
                Tenant Registration & Verification System
              </p>
            </Grid>

            <Grid item lg={6} display={"flex"} justifyContent={"flex-end"}>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div className="class" onClick={() => TenantLoginPage()}>
                  <div>
                    <PersonIcon sx={{ fontSize: "30px" }} />
                  </div>
                  <div className="nav-item-a">
                    <Typography>Tenant</Typography>
                  </div>
                </div>

                <div className="class" onClick={() => HotelLoginPage()}>
                  <div style={{ padding: "0px 5px" }}>
                    <HotelIcon sx={{ fontSize: "30px" }} />
                  </div>
                  <div className="nav-item-a">
                    <Typography>Hotel</Typography>
                  </div>
                </div>

                <div className="class" onClick={() => PoliceLoginPage()}>
                  <div>
                    <LocalPoliceIcon sx={{ fontSize: "30px" }} />
                  </div>
                  <div className="nav-item-a">
                    <Typography>Police</Typography>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
