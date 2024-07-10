import * as React from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import products from "../../../service/products";

const validationSchema = Yup.object().shape({
  age_max: Yup.number().required("Age Max is required"),
  age_min: Yup.number().required("Age Min is required"),
  category_id: Yup.string().required("Category ID is required"),
  color: Yup.array()
    .of(Yup.string().required("Color is required"))
    .min(1, "Color is required"),
  cost: Yup.number().required("Cost is required"),
  count: Yup.number().required("Count is required"),
  description: Yup.string().required("Description is required"),
  discount: Yup.number().required("Discount is required"),
  for_gender: Yup.string().required("Gender is required"),
  made_in: Yup.string().required("Made in is required"),
  product_name: Yup.string().required("Product Name is required"),
  size: Yup.array()
    .of(Yup.string().required("Size is required"))
    .min(1, "Size is required"),
});

const initialValues = {
  age_max: "",
  age_min: "",
  category_id: "",
  color: [],
  cost: "",
  count: "",
  description: "",
  discount: "",
  for_gender: "",
  made_in: "",
  product_name: "",
  size: [],
};

const Fade = ({ children, in: open }) => {
  const style = {
    opacity: open ? 1 : 0,
    transition: "opacity 0.5s",
  };

  return <div style={style}>{open ? children : null}</div>;
};

const AddProductModal = ({ open, handleClose }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await products.create(values);
      if (response.status === 201) {
        window.location.reload(); // Refresh page on successful submission
      } else {
        // Handle other status codes or errors
        console.error("Failed to create product:", response);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setSubmitting(false); // Always set submitting to false after API call
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
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxWidth: 600,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            Add Product
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    display: "grid",
                    gap: "10px",
                    gridTemplateColumns: "1fr 1fr",
                    textAlign: "left",
                  }}
                >
                  <Field
                    name="age_max"
                    type="number"
                    as={TextField}
                    label="Age Max"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="age_max" />}
                  />
                  <Field
                    name="count"
                    type="number"
                    as={TextField}
                    label="Count"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="count" />}
                  />
                  <Field
                    name="age_min"
                    type="number"
                    as={TextField}
                    label="Age Min"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="age_min" />}
                  />
                  <Field
                    name="discount"
                    type="number"
                    as={TextField}
                    label="Discount"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="discount" />}
                  />
                  <Field
                    name="category_id"
                    type="text"
                    as={TextField}
                    label="Category ID"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="category_id" />}
                  />
                  <Field
                    name="made_in"
                    type="text"
                    as={TextField}
                    label="Made In"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="made_in" />}
                  />
                  <Field
                    name="color"
                    type="text"
                    as={TextField}
                    label="Color"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="color" />}
                  />
                  <Field name="for_gender" as={RadioGroup} row>
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
                    <ErrorMessage name="for_gender" component="div" />
                  </Field>
                  <Field
                    name="cost"
                    type="number"
                    as={TextField}
                    label="Cost"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="cost" />}
                  />
                  <Field
                    name="size"
                    type="text"
                    as={TextField}
                    label="Size"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="size" />}
                  />
                </Box>
                <Field
                  name="product_name"
                  type="text"
                  as={TextField}
                  label="Product Name"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  helperText={<ErrorMessage name="product_name" />}
                />
                <Field
                  name="description"
                  type="text"
                  as={TextField}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ mt: 1 }}
                  helperText={<ErrorMessage name="description" />}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
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

export default AddProductModal;
