import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import axios from "axios";

export default function Info() {
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const [information, setInformation] = useState(null);

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("policeToken");
    // console.log(token);
  }

  const fetchData = async () => {
    const { hotel_ID } = router.query;

    const url =
      "https://fyp-tenant.herokuapp.com/api/police/hotel?hotel_ID=" + hotel_ID;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
      setInformation(response.data.hotel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ background: "#f1f1f1", height: "100vh" }}>
        <Grid container>
          <Grid item lg={3} textAlign="center" marginTop={"30px"}>
            <Button
              variant="contained"
              onClick={() =>
                router.push("/Police-System/Hotels/Hotel-Information")
              }
            >
              <ArrowLeftIcon /> Back
            </Button>
          </Grid>
          <Grid item lg={6} marginTop={"10%"} sx={{ marginBottom: "50px" }}>
            <Paper elevation={10}>
              <div className="main-div" style={{ marginBottom: "50px" }}>
                <div
                  className="information-heading"
                  style={{ background: "rgb(225 225 225)" }}
                >
                  <h2
                    style={{
                      marginLeft: "50px",
                    }}
                  >
                    Hotel Information
                  </h2>
                </div>
                {information && (
                  <div className="tenant-information">
                    <div className="info">
                      <Grid container>
                        <Grid item lg={4}>
                          <p> Hotel Name : {information.hotel_name}</p>
                        </Grid>
                        <Grid item lg={4}>
                          <p>Email : {information.email}</p>{" "}
                        </Grid>
                        <Grid item lg={4}>
                          {" "}
                          <p>Phone : {information.phone}</p>
                        </Grid>
                        <Grid item lg={4}>
                          {" "}
                          <p>Total Rooms : {information.totalRooms}</p>
                        </Grid>
                        <Grid item lg={4}>
                          {" "}
                          <p>Owner Name : {information.own_name}</p>
                        </Grid>

                        <Grid item lg={4}>
                          <p>Owner Father : {information.own_father}</p>
                        </Grid>

                        <Grid item lg={4}>
                          {" "}
                          <p>Phone : {information.phone}</p>
                        </Grid>

                        <Grid item lg={4}>
                          {" "}
                          <p>Owner Cnic : {information.own_cnic}</p>
                        </Grid>
                        <Grid item lg={4}>
                          {" "}
                          <p>Total Guests : {information.totalGuests} </p>
                        </Grid>
                        <Grid item lg={4}>
                          {" "}
                          <p>Address : {information.address}</p>
                        </Grid>
                        <Grid item lg={4}>
                          {" "}
                          <p>
                            Vacant Rooms :{" "}
                            {information.totalRooms - information.totalGuests}
                          </p>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </Grid>
          {information && (
            <Grid item lg={3} textAlign="center" marginTop={"30px"}>
              <Button
                variant="contained"
                onClick={() =>
                  router.push(
                    "/Police-System/Hotel-Custom-Pages/Guest-Information/Guest-InformationTwo?hotel_ID=" +
                      information._id
                  )
                }
              >
                Guests
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}
