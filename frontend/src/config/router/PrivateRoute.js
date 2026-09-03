import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../../components";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userData } = useSelector((state) => state.address.userData);
  const isLogged = userData?.isLogged;
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [userData]);

  return loading ? (
    <Loader content="authenticating..." />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
