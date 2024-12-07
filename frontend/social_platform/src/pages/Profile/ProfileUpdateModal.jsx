import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from '../../Redux/Authent/auth.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
};

export default function ProfileUpdateModal({ open, handleClose }) {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(auth.user?.profile || null);
  const [backgroundImage, setBackgroundImage] = useState(auth.user?.back_ground || null);

 
  const handleImageUpload = async (file, setImageCallback) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'social_networking_platform');
    data.append('cloud_name', 'djpfxhq6s');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/djpfxhq6s/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      setImageCallback(result.url);
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: auth.user?.firstName || '',
      lastName: auth.user?.lastName || '',
    },
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        profile: profileImage,
        back_ground: backgroundImage, 
      };
      dispatch(updateProfileAction(updatedValues)); 
      handleClose();
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <p>Profili Güncelle</p>
            <Button type="submit">Kaydet</Button>
          </div>

       
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0], setBackgroundImage)}
            />
            <img
              src={backgroundImage || auth.user?.back_ground}
              alt="Kapak Fotoğrafı"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>

     
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0], setProfileImage)}
            />
            <Avatar
              src={profileImage || auth.user?.profile}
              sx={{ width: '100px', height: '100px', margin: '16px auto' }}
            />
          </div>

        
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="Ad"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Soyad"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            margin="normal"
          />
        </form>
      </Box>
    </Modal>
  );
}
