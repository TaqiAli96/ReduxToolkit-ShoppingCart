import React from "react";

import History from "./History";
export default function IndexThree({ data }) {
  return (
    <>
      <div style={{ backgroundColor: "whitesmoke", height: "82vh" }}>
        <History data={data} />
      </div>
    </>
  );
}
