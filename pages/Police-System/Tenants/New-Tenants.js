import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Alert from "@mui/material/Alert";

import { useRouter } from "next/router";

let status;
let message;
const paperStyle = {
  marginBottom: "100px",
};
export default function NewTenants() {
  const router = useRouter();

  const [newTenants, setNewTenants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const SuccessAlert = () => {
    return (
      <Alert severity="success" sx={{ marginBottom: "20px" }}>
        Tenant Verified Successfully
      </Alert>
    );
  };
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("policeToken");
    // console.log(token);
  }
  //Fetch API
  const fetchUrl = "https://fyp-tenant.herokuapp.com/api/police/tenants/new";
  const fetchData = async () => {
    try {
      const response = await axios.get(fetchUrl, {
        headers: { Authorization: "Bearer " + token },
      });

      setNewTenants(response.data.list);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //POST API
  const postUrl = "https://fyp-tenant.herokuapp.com/api/police/tenants/verify";
  const verifyTenant = async (id) => {
    try {
      const response = await axios.post(
        postUrl,
        {
          residence_ID: id,
        },

        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(response);
      status = response.data.status;

      router.push("/Police-System/Tenants/Tenants");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {status === "success" && <SuccessAlert />}
        <Grid container></Grid>
      </div>
      <div
        style={{
          marginTop: "3%",
          marginLeft: "auto",
          marginRight: "auto",
          width: "75%",
        }}
      >
        <div>
          <h2 style={{ color: "#40292b", letterSpacing: "1px" }}>
            {" "}
            New Tenants Request : {newTenants && newTenants.length}
          </h2>
        </div>
        {newTenants.length > 0 ? (
          newTenants.map((data) => {
            const {
              own_cnic,
              own_father,
              own_name,
              own_address,
              entryAt,
              own_phone,
              address,
              _id,
              tenant,
            } = data;
            const { email, phone, father, cnic, name } = tenant;
            console.log(_id);

            return (
              <div style={{ marginTop: "5%" }}>
                <Paper elevation={10} style={paperStyle}>
                  <Grid container style={{ background: "#c9c9c9" }}>
                    <Grid item xl={6}>
                      <div
                        style={{
                          width: "80%",
                          margin: "0 auto",
                          display: "flex",
                        }}
                      >
                        <div style={{ marginTop: "10px" }}>
                          <AccountCircleIcon sx={{ fontSize: "40px" }} />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <p style={{ marginLeft: "4px" }}> Information</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xl={6} marginTop={"20px"}>
                      <div
                        style={{
                          width: "80%",
                          margin: "0 auto",
                          display: "flex",
                          justifyContent: "flex-end",

                          // border: "2px solid red",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "-15px",
                          }}
                        >
                          <Tooltip title="Verify">
                            <IconButton onClick={() => verifyTenant(_id)}>
                              <VerifiedUserIcon
                                sx={{ fontSize: "30px", color: "#000000" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p> Tenant Name : {name}</p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p> Tenant Cnic : {cnic}</p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Tenant Father : {father}</p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p> Tenant Phone : {phone}</p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p> Tenant Email : {email}</p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Owner Name :{own_name} </p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Address :{address} </p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Owner Cnic :{own_cnic} </p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Owner Father :{own_father}</p>
                      </div>
                    </Grid>

                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Owner Address :{own_address}</p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Owner Phone : {own_phone} </p>
                      </div>
                    </Grid>
                    <Grid item xl={4} textAlign="center">
                      <div style={{ marginLeft: "40px" }}>
                        <p>Entry Date : {entryAt} </p>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>Loading..... please Wait</p>
        )}
      </div>
    </div>
  );
}
