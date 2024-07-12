import * as React from "react";
import * as yup from "yup";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import workers from "../../../service/workers";

const validationSchema = yup.object().shape({
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  email: yup.string().email("Invalid email").required("Email is required"),
  first_name: yup.string().required("First Name is required"),
  gender: yup.string().required("Gender is required"),
  last_name: yup.string().required("Last Name is required"),
  password: yup.string().required("Password is required"),
  phone_number: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("Phone Number is required"),
});

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};

const Index = ({ open, handleClose, item }) => {
  const initialValues = {
    age: item?.age ? item.age : "",
    email: item?.email ? item.email : "",
    first_name: item?.first_name ? item.first_name : "",
    last_name: item?.last_name ? item.last_name : "",
    gender: item?.gender ? item.gender : "",
    password: item?.password ? item.password : "",
    phone_number: item?.phone_number ? item.phone_number : "",
  };

  const handleSubmit = async (values) => {
    if (item) {
      const payload = { id: item.id, ...values };
      try {
        const response = await workers.update(payload);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await workers.create(values);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Add Worker
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="age"
                  type="number"
                  as={TextField}
                  label="Age"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      className="text-[red] text-[15px]"
                      component="span"
                      name="age"
                    />
                  }
                />

                <Field
                  name="email"
                  type="text"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      className="text-[red] text-[15px]"
                      component="span"
                      name="email"
                    />
                  }
                />
                <Field
                  name="first_name"
                  type="text"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      className="text-[red] text-[15px]"
                      component="span"
                      name="first_name"
                    />
                  }
                />
                <Field name="gender" as={RadioGroup} row>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <ErrorMessage
                    className="text-[red] text-[15px]"
                    component="span"
                    name="gender"
                  />
                </Field>

                <Field
                  name="last_name"
                  type="text"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      className="text-[red] text-[15px]"
                      component="span"
                      name="last_name"
                    />
                  }
                />
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      className="text-[red] text-[15px]"
                      component="span"
                      name="password"
                    />
                  }
                />
                <Field
                  name="phone_number"
                  type="text"
                  as={TextField}
                  label="Phone"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      className="text-[red] text-[15px]"
                      component="span"
                      name="phone_number"
                    />
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px" }}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Index;
