import React from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle login logic here
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <Container component="main" maxWidth="md" sx={{ height: '100vh' }}>
      <Grid container spacing={15} sx={{ minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        {/* Left side image */}
        <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <img 
            src="https://img.freepik.com/premium-vector/team-work-co-working-space-concept-people-meeting-work-desk_138260-663.jpg?w=740"
            alt="Login illustration"
            style={{ width: '100%', height: 'auto', maxHeight: 'calc(100vh - 64px)' }}
          />
        </Grid>

        {/* Right side login form */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography component="h1" variant="h5">
              Welcome back!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Please login using your registered account
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Register Email id"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <center>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: '#7D0541', color: 'white', fontWeight: 'bold', borderRadius: '15px' }}
                >
                  LOGIN
                </Button>
              </center>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Link
                    onClick={() => navigate('/forgot-password')}
                    variant="body2"
                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ color: 'red', textDecoration: 'none', cursor: 'pointer' }}
                    onClick={handleReset}
                  >
                    Reset Here
                  </Link>
                </Grid>
              </Grid>

              {/* Don't have an account? Sign Up */}
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?{' '}
                <Link
                  onClick={() => navigate('/signup')}
                  sx={{ cursor: 'pointer', textDecoration: 'none', color: '#7D0541' }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
