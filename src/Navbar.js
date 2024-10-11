// import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Invoice from './Invoice';
import Home from './Home';

const NavbarWithSidebar = ({ onhome, oninvoice }) => {
//   const [open] = useState(false);

  const handleHome = () => {
   // Add your home functionality if needed
  };

  const handleInvoice = () => {
    // Add your invoice functionality if needed
  };

  return (
    <div>
      {/* Fixed Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#7D0541' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Invoice Generation
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Adjust content layout to account for fixed navbar */}
      <div style={{ display: 'flex', marginTop: '64px' }}>
        {/* Fixed Sidebar */}
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 200,
              backgroundColor: '#7D0541',
              boxSizing: 'border-box',
              top: '64px',
              height: 'calc(100% - 64px)', // Full height excluding navbar height
            },
          }}
        >
          <List>
            <ListItem button='true' component={Link} to="/home" onClick={handleHome} sx={{color:'white'}}>
              <ListItemText primary="Home"/>
            </ListItem>
            <ListItem button='true' component={Link} to="/invoice" onClick={handleInvoice} sx={{color:'white'}}>
              <ListItemText primary="Invoice" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: '20px', marginLeft: '200px' }}> {/* Adjusted marginLeft */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default NavbarWithSidebar;

