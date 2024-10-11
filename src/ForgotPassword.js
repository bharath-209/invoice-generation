import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent

  const formik = useFormik({
    initialValues: {
      identifier: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .required('Email or Phone Number is required')
        .test('identifier', 'Invalid identifier', function (value) {
          return (
            this.parent.identifier.match(/^\S+@\S+\.\S+$/) || 
            this.parent.identifier.match(/^\d{10}$/) || 
            this.parent.identifier.match(
              /^((\+)?(\d{1,4})[-. ]?)?((\(?\d{1,4}\)?)[-.\s]?)?[\d\s-]{7,10}$/i
            )
          );
        }),
      otp: Yup.string().when('otpSent', {
        is: true,
        then: Yup.string()
          .required('OTP is required')
          .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
      }),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle forgot password logic here, such as verifying OTP and updating the password
    },
  });

  const handleSendOtp = () => {
    setOtpSent(true);
    console.log('OTP sent to:', formik.values.identifier);
    // Call API to send OTP to the provided identifier (email/phone number)
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={15} sx={{ minHeight: '80vh', alignItems: 'center' }}>
        {/* Left side image */}
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <img
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg"
            alt="Forgot Password illustration"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        {/* Right side form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: { xs: '100%', sm: '80%' }, maxWidth: '400px' }}>
            <Typography component="h1" variant="h5" align="center">
              Forgot Password
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Please enter your email or phone number to reset your password
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                fullWidth
                id="identifier"
                label="Email or Phone Number"
                name="identifier"
                autoComplete="identifier"
                autoFocus
                value={formik.values.identifier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                helperText={formik.touched.identifier && formik.errors.identifier}
                sx={{ mb: 2 }}
              />
              {!otpSent && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSendOtp}
                  sx={{ mt: 2, mb: 2, bgcolor: '#7D0541', color: 'white', fontWeight: 'bold', borderRadius: '15px' }}
                  disabled={!formik.values.identifier || Boolean(formik.errors.identifier)}
                >
                  Send OTP
                </Button>
              )}
              {otpSent && (
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    id="otp"
                    label="Enter OTP"
                    name="otp"
                    autoComplete="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                    helperText={formik.touched.otp && formik.errors.otp}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: '#7D0541', color: 'white', fontWeight: 'bold', borderRadius: '15px' }}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
