import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const NavItem = (props: any) => {
  const { href, icon, title} = props;
  let location = useLocation();
  const active = href ? (location.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
    >
      <Link
        to={href}
        style={{width: "100%"}}
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active ? 'rgba(255,255,255, 0.08)' : 'transparent',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
