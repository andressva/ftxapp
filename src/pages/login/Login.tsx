import React, { useContext } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { IAuthContextValues } from '../../types/auth';
import { AuthContext } from "../../context/AuthContext"

interface MyFormValues {
  email: string
  password: string
}

const Login = () => {
  const initialValues: MyFormValues = { email: 'demo@devias.io', password: 'Password123' };
  const { handleLogin } : IAuthContextValues = useContext(AuthContext);

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            if(handleLogin)(
              handleLogin(values)
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
                Sign in
              </Typography>
            </Box>
            <Field name="email" placeholder="Email" component={({ field, form, ...props }: FieldProps) => (
              <TextField
                {...field}
                {...props}
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                type="email"
                variant="outlined"
              />
            )} />
            <Field name="password" placeholder="Password" component={({ field, form, ...props }: FieldProps) => (
              <TextField
                {...field}
                {...props}
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                type="password"
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
                Sign In Now
              </Button>
            </Box>
          </Form>
        </Formik>
      </Container>
    </Box>
  )
}

export default Login
