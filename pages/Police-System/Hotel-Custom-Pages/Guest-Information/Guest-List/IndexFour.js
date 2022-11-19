import React from "react";
import List from "./List";
export default function Index({ data }) {
  return (
    <>
      <div style={{ backgroundColor: "whitesmoke", height: "82vh" }}>
        <List data={data} />
      </div>
    </>
  );
}
