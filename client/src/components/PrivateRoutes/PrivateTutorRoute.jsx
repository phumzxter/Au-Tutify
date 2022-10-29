import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateTutorRoute = () => {
  const [tutor, setTutor] = useState(localStorage.getItem("role") === "tutor" ? true : null);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return tutor ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateTutorRoute;
