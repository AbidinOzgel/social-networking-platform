import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Card, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { navigationMenu } from './SidebarNavigation';

const Sidebar = () => {
  const {auth}=useSelector(store=>store)
  const [anchorEl, setAnchorEl] = React.useState(null) ;
  const open = Boolean(anchorEl);
  const navigate=useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
   
    if (item.title.toLowerCase() === "profile") {
      navigate(`/profile/${auth.user?.id}`);
    } else {
      
      navigate(item.path);
    }
  };
  


  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>

      <div className='space-y-8 pl-5'>

        <div className=''>

          <span className='logo font-bold text-xl'>
            Sosyal Ağ
          </span>

        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item)=> <div onClick={()=>handleNavigate(item)} className='cursor-pointer flex space-x-3 items-center'>
          {item.icon}
          <p className='text-xl'>{item.title}</p>
            </div>)}

        </div>

      </div>

      <div>
        <Divider/>
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center  space-y-5'>
            <Avatar  src='https://res.cloudinary.com/djpfxhq6s/image/upload/v1733398564/yroux8mlpmfjeakjpsuc.png' />
            <div>
              <p className='font-bold'>  {auth.user?.firstName+ " " + auth.user?.lastName }   </p>
              <p className='opacity-70'>@{auth.user?.firstName.toLowerCase()+ "_"+ auth.user?.lastName.toLowerCase() }</p>
            </div>

          </div>
          <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       
        <MenuItem onClick={handleClose}>Cikis</MenuItem>
      </Menu>

        </div>
      </div>
      

      
    </Card>
  )
}

export default Sidebar
