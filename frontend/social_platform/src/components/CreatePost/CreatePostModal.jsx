import DuoIcon from '@mui/icons-material/Duo';
import ImageIcon from '@mui/icons-material/Image';
import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';
import { upCloudinary } from '../../utils/upCloudinary';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: ".6rem"
};

const CreatePostModal = ({ handleClose, open }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const dispatch=useDispatch();

    const { auth } = useSelector(store => store);

    const [isLoading, setIsLoading] = useState(false); // Yuklemeden sonra aktifleşmesi için default değer veriliyor.
    

   

    const [selectedVideo, setSelectedVideo] = useState();
    const [selectedImage, setSelectedImage] = useState();

    const handleSelectImage = async(event) => { 
        setIsLoading(true);
        const imageUrl=await upCloudinary(event.target.files[0],"image")
        setSelectedImage(imageUrl);   
        setIsLoading(false);
        formik.setFieldValue("image",imageUrl)
    };

    const handleSelectVideo =async(event) => {
        setIsLoading(true);
        const videoUrl=await upCloudinary(event.target.files[0],"video")
        setSelectedVideo(videoUrl);   // amac dosya buluta atilirken loading sombolununun ekrana cikmasi
        setIsLoading(false);
        formik.setFieldValue("video",videoUrl)
     };

    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: ""
        },
        onSubmit: (values) => {
            console.log("Gönderi oluşturma verileri ", values);
            dispatch(createPostAction(values))
        }
    });

  

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='flex space-x-4 items-center'>
                        <Avatar 
    src={auth.user?.profile || "/path/to/placeholder.jpg"} 
    alt="Profile Picture" 
    sx={{ width: 56, height: 56 }} 
/>
                            <div>
                                <p className='font-semibold text-lg text-gray-800'>{auth.user?.firstName + " " + auth.user?.lastName}</p>
                                <p className='text-sm text-gray-500'>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
                            </div>
                        </div>

                        <textarea
                            placeholder="Metin yaz"
                            name="caption"
                            id=""
                            value={formik.values.caption}
                            onChange={formik.handleChange}
                            rows="6"
                            className="w-full p-4 mt-3 border border-gray-300 rounded-xl shadow-md focus:ring-4 focus:ring-blue-300 focus:border-blue-500 focus:outline-none resize-none transition-all duration-300 ease-in-out"
                        />

                        <div className="flex items-center gap-8 mt-6">
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleSelectImage}    
                                      style={{ display: "none" }}
                                    id="inputImage"
                                />
                                <label htmlFor="inputImage" className="cursor-pointer">
                                    <IconButton component="span" className="text-blue-600 hover:bg-blue-100 hover:shadow-lg transition-all ease-in-out">
                                        <ImageIcon />
                                    </IconButton>
                                </label>
                                <span className="text-sm font-medium text-gray-700 mt-2">Resim</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleSelectVideo}
                                    id="inputVideo"
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="inputVideo" className="cursor-pointer">
                                    <IconButton className="text-blue-600 hover:bg-blue-100 hover:shadow-lg transition-all ease-in-out">
                                        <DuoIcon />
                                    </IconButton>
                                </label>
                                <span className="text-sm font-medium text-gray-700 mt-2">Video</span>
                            </div>
                        </div>

                        {selectedImage && (
                            <div className="mt-4">
                                <img className='h-48 object-cover rounded-lg shadow-md' src={selectedImage} alt="selected" />
                            </div>
                        )}

                        <div className="mt-6">
                            <Button variant="contained" type='submit' sx={{ borderRadius: "2rem", width: "100%" }} color="primary">
                                Gönderi
                            </Button>
                        </div>

                    </div>

                </form>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    );
}

export default CreatePostModal;
