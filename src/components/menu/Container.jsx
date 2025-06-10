import React, { useState } from "react";

const Container = ({ gameName = "Coming soon !", setIsClicked }) => {

  const [hover, setHover] = useState(false);

  if (gameName === "Coming soon !") {
    return (<div
      onClick={(e) => setIsClicked(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "500px",
        height: "250px",
        backgroundColor: "#ECEFCA",
        borderRadius: "10px",
        boxShadow: "0 0 12px 6px #000",
        transform: hover ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h2 style={{ textAlign: "center" }}>{gameName}</h2>
    </div>
    );
  } else {

    return (
      <div
        onClick={(e) => setIsClicked(true)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "500px",
          height: "250px",
          backgroundColor: "#ECEFCA",
          borderRadius: "10px",
          boxShadow: "0 0 12px 6px #000",
          transform: hover ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 style={{ textAlign: "center" }}>{gameName}</h2>
      </div>
    );
  }
}

export default Container;
