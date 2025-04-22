import User from "../../domain/entities/User";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

function Register({}) {
  if (User.getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <div>Register</div>
    </Layout>
  )
}

export default Register;