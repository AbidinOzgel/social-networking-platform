import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RegisterUserAction } from "../../Redux/Authent/auth.action";

// yup reactta form verilerinin validasyon kontrollerini yapmak icin kullanilir

const initialValues = {
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  gender: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz Email").required("Lütfen email giriniz"),
  password: Yup.string()
    .min(6, "Şifre minimum 6 karakter olmalıdır")
    .required("Lütfen şifre giriniz"),
});
const Register = () => {
  const [gender, setGender] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (values) => {
    values.gender = gender;
    // Form verilerini burada inceleyebilirsiniz
    console.log(values);
    dispatch(RegisterUserAction({data:values}))
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="isim"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="soyisim"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="sifre"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Kadin"
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Erkek"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </RadioGroup>
            <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
            >
              Kaydol
            </Button>
          </div>
        </Form>
      </Formik>
      <div className="mt-6 text-center space-y-4">
  <p className="text-gray-300 text-lg">Hesabın zaten var mı?</p>
  <Button
    onClick={() => navigate("/login")}
    className="relative inline-flex items-center justify-center py-3 px-6 font-medium text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-gradient-to-l hover:from-gray-600 hover:to-gray-400 shadow-2xl transform transition-all"
  >
    <span
      className="absolute inset-0 w-full h-full bg-white opacity-15 rounded-full transition-all duration-500"
    ></span>
    <span
      className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-30 hover:opacity-60 rounded-full transition-all duration-500"
    ></span>
    <span className="relative z-10 flex items-center space-x-2 text-sm font-semibold text-gray-100">
      <span>Giriş Yap</span>
    </span>
  </Button>
</div>

    </>
  );
};

export default Register;
