import React from "react";
import { Route, Routes } from "react-router-dom";

import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ForgotPassword } from "./pages/ForgotPassword";
import { RecoverPassword } from "./pages/RecoverPassword";

import { PrivateRoute } from "./components/PrivateRoute";
import { VerifyEmail } from "./pages/VerifyEmail";
import { NotVerified } from "./pages/NotVerified";

export function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/recover" element={<RecoverPassword />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/verify"
        element={
          <PrivateRoute>
            <VerifyEmail />
          </PrivateRoute>
        }
      />

      <Route
        path="/not-verified"
        element={
          <PrivateRoute>
            <NotVerified />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
