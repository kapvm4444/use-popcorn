import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import RatingStar from "./components/RatingStar";

function Test() {
  const [rating, setRating] = useState(0);

  return (
    <>
      <RatingStar onSetRate={setRating} maxRating={10} color={"Blue"} />
      <p>The rating is {rating}</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Test />

    <RatingStar
      maxRating={5}
      color={"red"}
      size={64}
      messages={["Worst", "Bad", "OK", "Good", "Wonderful"]}
      defaultRating={0}
      className={"test"}
    />
    {/*<App />*/}
  </React.StrictMode>,
);
