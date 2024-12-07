import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../Redux/Authent/auth.action";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(password, token);
      setSuccess(true);
      setError(null);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h4" gutterBottom>
        Yeni Şifre Belirle
      </Typography>
      {success ? (
        <Typography color="green">Şifreniz başarıyla değiştirildi.</Typography>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-80">
          <TextField
            fullWidth
            label="Yeni Şifre"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Gönder
          </Button>
        </form>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default ResetPassword;
