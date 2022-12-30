import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import React from "react";
import NavBar from "./Nav-Bar";
import Head from "next/head";

export default function MainLandingPage() {
  return (
    <>
      <Head>
        <title>TRVS</title>
      </Head>
      <div className="header">
        <NavBar />
        <div className="header-bg">
          <div className="header-text">
            <div className="header-content">
              <div className="app-heading">
                <h1>
                  Tenant Registration & Verification System
                  <VerifiedUserIcon className="verify-icon" />
                </h1>
              </div>
              <div className="app-para">
                <h2>
                  This System will help the Punjab police and government of
                  Punjab in maintaining the tenants of Punjab province. The
                  local tenants will also be facilitated with this system with
                  verification of their request without forcible locomotion to
                  the police station. It also facilitate Punjab Police to verify
                  Hotels of their operational Areas
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
