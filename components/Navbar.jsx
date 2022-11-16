import styled from '@emotion/styled';
import { AppBar, Badge, Box, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import InputBase from '@mui/material/InputBase';
import { Mail, Notifications, SettingsPowerRounded } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",

});

const Search = styled("div") (({theme}) => ({
  backgroundColor: "white",
  width: "40%",
  borderRadius: '10px',
  padding: "0 10px",
}));


const Icons = styled(Box) (({theme})=> ({
  display: "none",
  justifyContent:"space-between",
  alignItems:"center",
  gap:"20px",

}));

const MobileBox = styled(Box) (({theme})=> ({
  display: "flex",
  justifyContent:"space-between",
  alignItems:"center",
  gap:"10px",


}));

const Navbar = () => {
  const [open,setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: {xs:"none" , sm:"block"} }}>
          FAHIM
        </Typography>
        <AdbRoundedIcon sx={{ display: {xs:"block",sm:"none"} }}/>
        <Search>
          <InputBase placeholder='search...'/>
        </Search>
        <Icons>
        <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
        
        <Avatar 
        alt="Travis Howard" 
        src="/static/images/avatar/2.jpg"
        onClick={(e) => setOpen(true)} 
        />
        </Icons>
        <MobileBox onClick={(e) => setOpen(true)}>
        <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">Fahim</Typography>
        </MobileBox>
      </StyledToolbar>
      <Menu
        // sx={{ display: { xs: 'none', md: 'block' } }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        // onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem >Logout</MenuItem>
      </Menu>
      
    </AppBar>
  )
}

export default Navbar;

