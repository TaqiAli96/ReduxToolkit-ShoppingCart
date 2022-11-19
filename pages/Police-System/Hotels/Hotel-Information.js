import React, { useState } from "react";
import HotelList from "./Hotel-List";
import NewHotels from "./New-Hotels";
import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useRouter } from "next/router";

import { Grid, Typography } from "@mui/material";
export default function HotelInformation() {
  const router = useRouter();

  const [value, setValue] = useState(1);
  return (
    <>
      <div>
        <Grid container>
          <Grid item lg={4} textAlign="center" marginTop={"40px"}>
            <Button
              variant="contained"
              onClick={() => router.push("/Police-System/Police-Dashboard")}
            >
              <ArrowLeftIcon />
            </Button>
          </Grid>
          <Grid item lg={4} textAlign="center"></Grid>
          <Grid item lg={4}></Grid>

          <Grid item lg={4}></Grid>
          <Grid
            item
            lg={4}
            // backgroundColor={"#808080"}
            textAlign="center"
            display={"flex"}
            justifyContent={"space-evenly"}
            padding={"10px"}
          >
            <Typography
              variant="p"
              // style={{ color: "#F0F8FF" }}
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => setValue(0)}
              className={value === 0 ? "borderBottom" : ""}
            >
              New Hotel
            </Typography>

            <Typography
              variant="p"
              onClick={() => setValue(1)}
              style={{ cursor: "pointer", fontSize: "20px" }}
              className={value === 1 ? "borderBottom" : ""}
            >
              Hotel List
            </Typography>
          </Grid>
        </Grid>
      </div>
      {value === 1 && <HotelList />}
      {value === 0 && <NewHotels />}
    </>
  );
}
