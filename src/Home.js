import React from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Home = () => {
  // Formik setup with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      shopName: '',
      shopAddress: '',
      gstin: '',
      gstPercentage: '',
    },
    validationSchema: Yup.object({
      shopName: Yup.string().required('Company/Shop Name is required'),
      shopAddress: Yup.string().required('Company/Shop Address is required'),
      gstin: Yup.string().required('Company/Shop GSTIN is required'),
      gstPercentage: Yup.number()
        .min(0, 'GST Percentage cannot be negative')
        .max(100, 'GST Percentage cannot exceed 100%')
        .required('GST Percentage is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic
    },
  });

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={15} sx={{ minHeight: '100vh', alignItems: 'center' }}>
        {/* Left side illustration */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '100%',
              height: 'auto',
              p: 2,
            }}
          >
            <img
              src="https://fanatic.co.uk/wp-content/uploads/2022/02/92812-business-presentation.gif"
              alt="Shop Illustration"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>

        {/* Right side Shop Details form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: { xs: 2, md: 4 },
              width: '100%',
            }}
          >
            <Typography component="h1" variant="h5">
              Company/Shop Details
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, width: '100%' }}>
              <TextField
                variant="outlined"
                fullWidth
                id="shopName"
                label="Company/Shop Name"
                name="shopName"
                value={formik.values.shopName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.shopName && Boolean(formik.errors.shopName)}
                helperText={formik.touched.shopName && formik.errors.shopName}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="shopAddress"
                label="Company/Shop Address"
                name="shopAddress"
                value={formik.values.shopAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.shopAddress && Boolean(formik.errors.shopAddress)}
                helperText={formik.touched.shopAddress && formik.errors.shopAddress}
                sx={{ mb: 2 }}
                multiline
                rows={3}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="gstin"
                label="Company/Shop GSTIN"
                name="gstin"
                value={formik.values.gstin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gstin && Boolean(formik.errors.gstin)}
                helperText={formik.touched.gstin && formik.errors.gstin}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="gstPercentage"
                label="GST in %"
                name="gstPercentage"
                type="number"
                value={formik.values.gstPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gstPercentage && Boolean(formik.errors.gstPercentage)}
                helperText={formik.touched.gstPercentage && formik.errors.gstPercentage}
                sx={{ mb: 2 }}
              />
              <center>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: '#7D0541',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '15px',
                  }}
                >
                  Add
                </Button>
              </center>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
