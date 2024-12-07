import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar, Card, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../Redux/Post/post.action';
import CreatePostModal from './CreatePost/CreatePostModal';
import PostCard from './Post/PostCard';
import StoryBar from './StoryBar';



const story=[1,1,1,1]
const posts=[1,1,1,1]
const MiddlePart = () => {

  const { post } = useSelector((store) => store);
  

console.log("Store'dan gelen post verisi:", post); 



console.log("post ",post);

  const dispatch=useDispatch();
  const [openCreatePostModal,setOpenCreatePostModal]=useState(false);
  const handleCloseCreatePostModal=()=>setOpenCreatePostModal(false);


  const handleOpenCreatePostModal=()=>{
    setOpenCreatePostModal(true)
    console.log("post modali ",openCreatePostModal)
  }

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment]); 

   

  console.log(useEffect);

  return (

    <div className='px-20'>
    <section className=' flex items-center p-5 rounded-b-md'>
      <section  className='flex flex-col items-center mr-4 cursor-pointer'>
      <Avatar 
      sx={{width:"5rem",height:"5rem"}} > 

      <AddIcon sx={{fontSize:"3rem"}}/>
      </Avatar>
      <p>yeni</p>
      </section>
      {story.map((item)=><StoryBar/>)}
    

      </section>

      <Card className='p-5 mt-5'>
  <div className='flex items-center gap-4'>
    <Avatar />
    
    <input onClick={handleOpenCreatePostModal} readOnly className='outline-none flex-1 rounded-full px-5 bg-transparent border-[#3b4054] border' type='text'/>
  </div>
  <div className='flex justify-center space-x-9 mt-5'>
    <div className='flex items-center'>
      <IconButton color='primary' onclick={handleOpenCreatePostModal}>
        <ImageIcon/>
      </IconButton>

      <span>
        resim
      </span>

    </div>

    <div className='flex items-center'>
      <IconButton color='primary' onclick={handleOpenCreatePostModal}>
        <VideocamIcon/>
      </IconButton>

      <span>
        video
      </span>

    </div>
    <div className='flex items-center'>
      <IconButton color='primary' onclick={handleOpenCreatePostModal}>
        <ArticleIcon/>
      </IconButton>

      <span>
         metin yaz
      </span>
    </div>  
  </div>

</Card>
<div className='mt-5 space y-5'>

 {
  post.posts.map((item) => <PostCard item={item}/>)
}



</div>  
<div>
  <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal}/>
</div>


    </div>
  
    
  )
}

export default MiddlePart
