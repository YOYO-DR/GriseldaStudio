import User from "../../domain/entities/User";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

function Login({}) {
  if (User.getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <div>Login</div>
    </Layout>
  )
}

export default Login;