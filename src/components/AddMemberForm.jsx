import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addMember, updateMember } from "../redux/action/memberAction";

const INITIAL_STATE = {
  name: "",
  email: "",
  address: "",
  organization: "",
  designation: "",
  contact: "",
};

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string("Enter the name").required("Enter the name"),
  email: Yup.string("Enter the email")
    .required("Enter the email")
    .email("Email is not valid"),
  address: Yup.string("Enter the address").required("Enter the address"),
  organization: Yup.string("Enter the organization").required(
    "Enter the organization"
  ),
  designation: Yup.string("Enter the designation").required(
    "Enter the designation"
  ),
  contact: Yup.string("Enter contact")
    .required("Enter the contact number")
    .min(10, "Contact number is not valid")
    .max(10, "Contact number is not valid"),
});

const configData = {
  fullWidth: true,
  size: "small",
  variant: "outlined",
};

const AddMemberForm = (props) => {
  const { open, handleDialog, isUpdate, updateItem, handleUpdate } = props;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      if (isUpdate) {
        dispatch(updateMember({ ...values, _id: updateItem._id }));
      } else {
        dispatch(addMember({ ...values, _id: uuidv4() }));
      }
      handleDialog();
      formik.handleReset();
      handleUpdate(false, null);
    },
  });

  useEffect(() => {
    if (isUpdate) {
      formik.setFieldValue("name", updateItem.name);
      formik.setFieldValue("email", updateItem.email);
      formik.setFieldValue("address", updateItem.address);
      formik.setFieldValue("organization", updateItem.organization);
      formik.setFieldValue("designation", updateItem.designation);
      formik.setFieldValue("contact", updateItem.contact);
    }
  }, [isUpdate]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDialog();
        handleUpdate(false, null);
        formik.handleReset();
      }}
    >
      <DialogTitle>{isUpdate ? "UPDATE" : "ADD"} MEMBER</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {isUpdate && (
              <Grid item xs={12}>
                <TextField {...configData} label="ID" value={updateItem._id} />
              </Grid>
            )}
            {Object.keys(INITIAL_STATE).map((item, i) => (
              <Grid item xs={12} key={i}>
                <TextField
                  {...configData}
                  label={item.toUpperCase()}
                  placeholder={`Enter ${item}`}
                  name={item}
                  value={formik.values[item]}
                  onChange={formik.handleChange}
                  error={formik.touched[item] && Boolean(formik.errors[item])}
                  helperText={formik.touched[item] && formik.errors[item]}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<Done />}
          >
            {isUpdate ? "UPDATE" : "SUBMIT"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddMemberForm;
