import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";

function ErrorStatus({ error }) {
  
  if (error.status === 404) {
    return <Navigate to="/404" />;
  }

  if (error.status < 200 || error.status >= 400) {
    return (
      <Layout>
        <div>{error.mensaje}</div>
      </Layout>
    );
  }

  return null;
}

export default ErrorStatus;
