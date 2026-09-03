import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/loaders/loading";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Loading content="authenticating..." />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
