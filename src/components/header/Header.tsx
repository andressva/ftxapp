import { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, Popover, MenuItem, MenuList } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../context/AuthContext';
import {IAuthContextValues} from '../../types/auth'

const DashboardNavbarRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const Header = (props: any) => {
  const { onSidebarOpen } = props;
  const { handleLogout }: IAuthContextValues = useContext(AuthContext) 
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
          >
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      {openAccountPopover && (
        <Popover
          anchorEl={settingsRef.current}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom'
          }}
          onClose={() => setOpenAccountPopover(false)}
          open={openAccountPopover}
          PaperProps={{
            sx: { width: '300px' }
          }}
        >
          <Box
            sx={{
              py: 1.5,
              px: 2
            }}
          >
            <Typography variant="overline">
              Account
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              John Doe
            </Typography>
          </Box>
          <MenuList
            disablePadding
            sx={{
              '& > *': {
                '&:first-of-type': {
                  borderTopColor: 'divider',
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px'
                },
                padding: '12px 16px'
              }
            }}
          >
            <MenuItem onClick={handleLogout}>
              Sign out
            </MenuItem>
          </MenuList>
        </Popover>
      )}
    </>
  );
};

Header.propTypes = {
  onSidebarOpen: PropTypes.func
};
