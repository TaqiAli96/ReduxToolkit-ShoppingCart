import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";

let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("hotelToken");
}
export default function UserTable() {
  const router = useRouter();

  useEffect(() => {
    getGuestList();
  }, []);

  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const api = "https://fyp-tenant.herokuapp.com/api/hotel/guests";

  const getGuestList = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setUserData(response.data.guests);
      setFilteredData(response.data.guests);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cnic",
      selector: (row) => row.cnic,
    },
    {
      name: "Room No",
      selector: (row) => row.room,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Entry At",
      selector: (row) => row.entryAt,
    },
    {
      name: "Action",
      cell: (row) => (
        <DeleteIcon
          sx={{ color: "red", cursor: "pointer" }}
          onClick={() => removeGuest(row._id)}
        />
      ),
    },
  ];

  useEffect(() => {
    const result = userData.filter((user) => {
      return user.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);
  return (
    // <></>
    <>
      <Grid container style={{ background: "whitesmoke" }}>
        <Grid item lg={2} marginTop={"30px"} textAlign="center">
          <Button
            variant="contained"
            onClick={() => router.push("/Hotel-System/Hotel-Dashboard")}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Grid>
        <Grid item lg={2}></Grid>
        <Grid item lg={4}></Grid>
        <Grid item lg={4}></Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        style={{
          backgroundColor: "whitesmoke",
          height: "92vh",
        }}
      >
        <Grid item lg={10} marginTop={"50px"}>
          <DataTable
            title="Guest List"
            columns={columns}
            // data={userData}
            data={filteredData}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="400px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
              <TextField
                id="outlined-basic"
                label="Search Here"
                variant="outlined"
                value={search}
                sx={{ marginBottom: "50px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
function removeGuest(guestId) {
  const api = "https://fyp-tenant.herokuapp.com/api/hotel/guest";

  const removeData = async () => {
    try {
      const response = await axios.delete(api, {
        headers: { Authorization: "Bearer " + token },
        data: { guest_ID: guestId },
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
