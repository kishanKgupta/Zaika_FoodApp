// src/components/ErrorPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <h1 className="error-title">404</h1>
      <p className="error-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
