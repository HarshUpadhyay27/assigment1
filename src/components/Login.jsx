import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch } from "react-redux";
import { login } from "../redux/action/authAction";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string("Enter the email")
    .required("Enter the email")
    .email("Email is not valid"),
  password: Yup.string("Enter Password")
    .required("Enter the password")
    .min(6, "Password is too small")
    .max(15, "password is too long"),
});

const configData = {
  fullWidth: true,
  size: "small",
  variant: "outlined",
};

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => dispatch(login(values)),
  });

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(INITIAL_STATE).map((item, i) => (
              <Grid item xs={12} key={i}>
                <TextField
                  {...configData}
                  label={item?.toUpperCase()}
                  placeholder={`Enter ${item}`}
                  name={item}
                  value={formik.values[item]}
                  onChange={formik.handleChange}
                  error={
                    formik.touched[item] && Boolean(formik.errors[item])
                  }
                  helperText={formik.touched[item] && formik.errors[item]}
                  type={item === "password"? "password": "text"}
                />
              </Grid>
            ))}
          </Grid>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ?<Link href="#">Sign Up</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
