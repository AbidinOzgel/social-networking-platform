import { Avatar, Button, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';

const PopulerUsers = () => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            K
          </Avatar>
        }
        action  ={
            <Button >
                takip et
            </Button>
        }
        title="kullanici 1"
        subheader="@kullanici1"
      />
    </div>
  )
}

export default PopulerUsers
