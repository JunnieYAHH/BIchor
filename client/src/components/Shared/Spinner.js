import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000000");

  return (
    <div className="d-flex justify-content-center">
      <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        sppedMultiplier={1}
      />
    </div>
  );
};

export default Spinner;