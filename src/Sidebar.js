import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        {/* Shop Details Button */}
        <ListItem button component="a" href="#">
          <ListItemText primary="Shop Details" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
