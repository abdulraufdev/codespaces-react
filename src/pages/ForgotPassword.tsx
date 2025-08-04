import React from "react";
import { ForgetPasswordForm } from "../components/forget-password-form";

const ForgotPassword = () => {
  return (
    <div className="bg-gray-100 grid place-content-center h-screen">
      <div className="bg-white p-8 border-2 border-gray-300 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
