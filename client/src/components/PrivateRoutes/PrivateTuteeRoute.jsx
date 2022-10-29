import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateTuteeRoute = () => {
  const [tutee, setTutee] = useState(localStorage.getItem("role") === "tutee" ? true : null);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return tutee ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateTuteeRoute;
