import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("policeToken");
}

export default function HotelList() {
  const router = useRouter();

  const [verifiedHotels, setVerifiedHotels] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const api = "https://fyp-tenant.herokuapp.com/api/police/hotels";

  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setVerifiedHotels(response.data.hotels);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ color: "#40292b", letterSpacing: "1px" }}>
          {" "}
          verified Hotels :{verifiedHotels && verifiedHotels.length}
        </h2>{" "}
      </div>
      <Grid container margin={"40px 0"}></Grid>
      <Paper elevation={10}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ background: "#1976D2", width: "100%" }}>
                {/* <TableCell /> */}
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Hotel Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Email{" "}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Address
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Owner
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Total Rooms
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Total Guests
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", textTransform: "uppercase" }}
                >
                  Remaining Rooms
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {verifiedHotels &&
                verifiedHotels.map((hotel) => {
                  const {
                    hotel_name,
                    address,
                    email,
                    own_name,
                    _id,
                    totalGuests,
                    totalRooms,
                  } = hotel;
                  return (
                    <TableRow key={_id}>
                      <TableCell align="center">
                        <Link
                          underline="none"
                          className="hotel_name"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push(
                              "/Police-System/Hotel-Custom-Pages/Custom-Hotel-Info?hotel_ID=" +
                                _id
                            )
                          }
                        >
                          {hotel_name}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{email}</TableCell>
                      <TableCell align="center">{address}</TableCell>

                      <TableCell align="center">{own_name}</TableCell>
                      <TableCell align="center">{totalRooms}</TableCell>
                      <TableCell align="center">{totalGuests}</TableCell>

                      <TableCell align="center">
                        {totalRooms - totalGuests}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
