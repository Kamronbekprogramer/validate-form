import { Button, TextField, Typography, Link } from "@mui/material";
import { auth } from "@service";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data?.access_token);
        toast.success("Login muvaffaqiyatli bajarildi!");
        setTimeout(() => {
          navigate("/main");
        }, 1500); 
      }
    } catch (error) {
      console.log(error);
      setErrors({
        submit: "Email yoki parol noto'g'ri. Qayta urinib ko'ring.",
      });
      toast.error("Email yoki parol noto'g'ri. Qayta urinib ko'ring.");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-[600px] p-5">
        <h1 className="text-center my-6 text-[50px]">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Yaroqsiz elektron pochta manzili")
              .required("Majburiy"),
              password: Yup.string()
              .min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
              .matches(/[A-Z]/, 'Parol kamida bitta katta harfdan iborat bo\'lishi kerak')
              .matches(/[a-z]/, 'Parol kamida bitta kichik harfdan iborat bo\'lishi kerak')
              .matches(/[0-9]/, 'Parolda kamida bitta raqam bo\'lishi kerak')
              .required('Majburiy'),
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
                label="Email"
                id="email"
                name="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                type="password"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="Password"
                id="password"
                name="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {errors.submit && (
                <p className="text-red-500 text-center">{errors.submit}</p>
              )}
              <NavLink
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </NavLink>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Sign In
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Don't have an account? <Link href="/sign-up">Register here</Link>
              </Typography>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Index;
