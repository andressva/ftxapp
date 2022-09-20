import React, { useContext } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Container,
  Modal,
  TextField,
} from '@mui/material';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IOwnProps {
  open: boolean
  group: any
  editing: boolean
  handleClose: () => void
  onSubmit: Function
}

interface MyFormValues {
  name: string
  description: string
}

const ModalGroup = ({ 
  open, 
  group,
  editing, 
  handleClose, 
  onSubmit }: IOwnProps) => {
  const initialValues: MyFormValues = { name: group?.name, description: group?.description };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            if (onSubmit) (
              onSubmit(values)
            )
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {editing ? "Edit Group" : "Create a group"}
              </Typography>
            </Box>
            <Field name="name" placeholder="Name" component={({ field, form, ...props }: FieldProps) => (
              <TextField
                {...field}
                {...props}
                fullWidth
                label="Name"
                margin="normal"
                name="name"
                variant="outlined"
              />
            )} />
            <Field name="description" placeholder="Description" component={({ field, form, ...props }: FieldProps) => (
              <TextField
                {...field}
                {...props}
                fullWidth
                label="Description"
                margin="normal"
                name="description"
                multiline
                rows={4}
                maxRows={4}
                variant="outlined"
              />
            )} />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  )
}

export default ModalGroup
