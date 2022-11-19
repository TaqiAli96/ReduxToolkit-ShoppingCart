// import React, { useEffect, useState } from "react";
// import { Paper } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import axios from "axios";

// const paperStyle = {
//   marginBottom: "100px",
// };
// export default function VerifiedTenants() {
//   //USE-STATE-HOOKS
//   const [verifiedTenants, setVerifiedTenants] = useState([]);
//   //USE-EFFECT-HOOKS
//   useEffect(() => {
//     fetchData();
//   }, []);

//   //TOKEN

//   let token = "";
//   if (typeof window !== "undefined") {
//     token = localStorage.getItem("policeToken");
//     // console.log(token);
//   }

//   const url = "https://fyp-tenant.herokuapp.com/api/police/tenants";

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(url, {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setVerifiedTenants(response.data.list);
//       console.log(response.data.list);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           width: "90%",
//           marginLeft: "auto",
//           marginRight: "auto",
//         }}
//       >
//         <Grid container></Grid>
//       </div>

//       <div
//         style={{
//           marginTop: "3%",
//           marginLeft: "auto",
//           marginRight: "auto",
//           width: "75%",
//         }}
//       >
//         {verifiedTenants.length > 0 ? (
//           verifiedTenants.map((data) => {
//             const {
//               own_cnic,
//               own_father,
//               own_name,
//               own_address,
//               entryAt,
//               own_phone,
//               address,
//               _id,
//             } = data;
//             const { email, phone, father, cnic, name } = data.tenant;
//             console.log(_id);

//             return (
//               <Paper elevation={10} style={paperStyle}>
//                 <Grid container>
//                   <Grid item xl={6} marginTop={"20px"}>
//                     <div
//                       style={{
//                         width: "80%",
//                         margin: "0 auto",
//                         display: "flex",
//                       }}
//                     >
//                       <AccountCircleIcon sx={{ fontSize: "40px" }} />
//                       <p style={{ marginLeft: "4px" }}> Information</p>
//                     </div>
//                   </Grid>
//                 </Grid>
//                 <hr />

//                 <Grid container>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p> Tenant Name : {name}</p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p> Tenant Cnic : {cnic}</p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Tenant Father : {father}</p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p> Tenant Phone : {phone}</p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p> Tenant Email : {email}</p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Owner Name :{own_name} </p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Address :{address} </p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Owner Cnic :{own_cnic} </p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Owner Father :{own_father}</p>
//                     </div>
//                   </Grid>

//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Owner Address :{own_address}</p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Owner Phone : {own_phone} </p>
//                     </div>
//                   </Grid>
//                   <Grid item xl={4} textAlign="center">
//                     <div style={{ marginLeft: "40px" }}>
//                       <p>Entry Date : {entryAt} </p>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             );
//           })
//         ) : (
//           <p style={{ textAlign: "center" }}>No Data</p>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Badge from "@mui/material/Badge";

import { useRouter } from "next/router";

const paperStyle = {
  marginBottom: "100px",
};
export default function TenantHistory() {
  const [tenantHistory, setTenantHistory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const api = "https://fyp-tenant.herokuapp.com/api/police/tenants";

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("policeToken");
    // console.log(token);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: "Bearer " + token },
      });
      setTenantHistory(response.data.list);
      // console.log(response.data.list);
      setFilteredData(response.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const result = tenantHistory.filter((user) => {
      return user.own_name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);
  return (
    <div>
      <div
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Grid container>
          <Grid item lg={12} marginTop={"70px"}>
            <h2 style={{ color: "#40292b", letterSpacing: "1px" }}>
              {" "}
              Verified Tenants : {tenantHistory.length}
            </h2>
          </Grid>
          <Grid item lg={12} align="center">
            <TextField
              id="outlined-basic"
              label="Search Here"
              variant="outlined"
              value={search}
              style={{ width: "30%" }}
              placeholder=""
              // fullWidth
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <div
                      style={{
                        // border: "2px solid red",
                        position: "absolute",
                        left: "90%",
                      }}
                    >
                      <SearchIcon />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          marginTop: "3%",
          marginLeft: "auto",
          marginRight: "auto",
          width: "75%",
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((data) => {
            const {
              address,
              entryAt,
              exitAt,
              own_cnic,
              own_name,
              own_father,
              own_phone,
            } = data;

            const { tenant } = data;
            const { cnic, email, father, phone, name } = tenant;
            return (
              <Paper elevation={10} style={paperStyle}>
                <Grid container style={{ background: " rgb(89 85 85)" }}>
                  <Grid
                    item
                    xl={11}
                    display={"flex"}
                    alignItems={"center"}
                    paddingTop={"5px"}
                    margin={"0 auto"}
                  >
                    <AccountCircleIcon
                      sx={{ fontSize: "40px", color: "#fff" }}
                    />
                    <p style={{ marginLeft: "4px", color: "#fff" }}>
                      Tenant Info
                    </p>
                  </Grid>
                </Grid>
                {/* <hr /> */}

                <Grid container>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Tenant Name : {name}</p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p> Tenant Cnic : {cnic}</p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p> Tenant Father : {father}</p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p> Tenant Phone : {phone}</p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Tenant Email : {email}</p>
                    </div>
                  </Grid>

                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Tenant Address : {address} </p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Owner name :{own_name} </p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Owner Cnic {own_cnic} </p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Owner Father : {own_father}</p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Owner Phone {own_phone} </p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Entry Date {entryAt} </p>
                    </div>
                  </Grid>
                  <Grid item xl={4} textAlign="center">
                    <div style={{ marginLeft: "40px" }}>
                      <p>Exit Date : {exitAt} </p>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No Data</p>
        )}
      </div>
    </div>
  );
}
