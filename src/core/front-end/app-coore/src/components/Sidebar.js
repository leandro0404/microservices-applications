import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    toggleDrawer(false);
    navigate(path);
  };

  const menuItems = [
    { text: 'Home', path: '/home' },
    { text: 'Profile', path: '/profile' },
    { text: 'Preferences', path: '/preferences' },
  ];

  const isHomeSelected = location.pathname === '/' || location.pathname === '/home';

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          paddingTop: 8,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleClick(item.path)}
            selected={isHomeSelected && item.path === '/home' || location.pathname === item.path}
            sx={{
              backgroundColor: (isHomeSelected && item.path === '/home') || location.pathname === item.path ? 'primary.main' : 'transparent',
              color: (isHomeSelected && item.path === '/home') || location.pathname === item.path ? 'white' : 'black',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white'
              }
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
