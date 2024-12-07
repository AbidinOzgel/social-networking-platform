import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "../Redux/Authent/auth.action";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h4" gutterBottom>
        Şifre Sıfırlama
      </Typography>
      {success ? (
        <Typography color="green">
          Şifre sıfırlama bağlantısı e-postanıza gönderildi.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-80">
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Gönder
          </Button>
        </form>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={() => navigate("/login")} variant="text">
        Giriş Yap
      </Button>
    </div>
  );
};

export default ForgotPassword;
