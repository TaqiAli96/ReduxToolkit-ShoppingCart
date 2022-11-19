import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function UserTable({ data }) {
  console.log(data);

  useEffect(() => {
    getData();
  }, []);

  const [search, setSearch] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("policeToken");
    // console.log(token);
  }

  const api =
    "https://fyp-tenant.herokuapp.com/api/police/hotels/guests?hotel_ID=" +
    data;

  const getData = async () => {
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

  {
    userData.map((data) => {
      return <p>{data.name}</p>;
    });
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Cnic",
      selector: (row) => row.cnic,
    },
    {
      name: "Room",
      selector: (row) => row.room,
    },
    {
      name: "Entry At",
      selector: (row) => row.entryAt,
    },
  ];

  useEffect(() => {
    const result = userData.filter((user) => {
      return user.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  return (
    <Grid container display={"flex"} justifyContent={"center"}>
      <Grid item lg={10} marginTop={"40px"}>
        <DataTable
          title="Guest List"
          columns={columns}
          data={filteredData}
          // data={userData}
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
  );
}
