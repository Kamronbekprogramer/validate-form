import { useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { auth } from "@service";
import { SignUpModal } from "@modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await auth.sign_up(values);
      if (response.status === 200) {
        setOpen(true);
        toast.success("Registration successful!");
      }
    } catch (error) {
      console.log(error);
      setErrors({ submit: "Registration failed. Please try again." });
      toast.error("Registration failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <SignUpModal open={open} handleClose={() => setOpen(false)} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Register</h1>
          <Formik
            initialValues={{
              email: "",
              full_name: "",
              password: "",
              phone_number: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Yaroqsiz elektron pochta manzili').required('Majburiy'),
              full_name: Yup.string().required('Majburiy'),
              password: Yup.string()
                .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
                .matches(/[A-Z]/, 'Parol kamida bitta katta harfdan iborat bo\'lishi kerak')
                .matches(/[a-z]/, 'Parol kamida bitta kichik harfdan iborat bo\'lishi kerak')
                .matches(/[0-9]/, 'Parolda kamida bitta raqam bo\'lishi kerak')
                .required('Majburiy'),
              phone_number: Yup.string().matches(/^\+998[0-9]{9}$/, 'Telefon raqami +998XXXXXXXXX formatida bo\'lishi kerak').required('Majburiy'),            
            })}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <TextField
                  type="email"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  label="Email"
                  id="email"
                  name="email"
                />
                <TextField
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.full_name}
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                  label="Full Name"
                  id="full_name"
                  name="full_name"
                />
                <TextField
                  type="password"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  label="Password"
                  id="password"
                  name="password"
                />
                <TextField
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                  label="Phone"
                  id="phone"
                  name="phone_number"
                />
                {errors.submit && (
                  <p className="text-red-500 text-center">{errors.submit}</p>
                )}
                <Link href="/">Sign In</Link>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;
