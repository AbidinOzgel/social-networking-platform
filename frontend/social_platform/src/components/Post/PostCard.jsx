import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Modal, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { islike } from '../../utils/islike';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: ".6rem"
};

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false); 
  const dispatch = useDispatch();
  const handleShowComment = () => setShowComments(!showComments);
  const { post, auth } = useSelector(store => store);

  const handleCreateComment = (content) => {
    const requestData = {
      postId: item.id,
      data: { content }
    };
    dispatch(createCommentAction(requestData));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

  const handleShowLikes = () => {
    setShowLikes(!showLikes); 
  };

  console.log("PostCard'a gelen item:", item);

  return (
    <Card className='shadow-xl rounded-lg overflow-hidden bg-white'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={item.user?.profile || ''}>
            {item.user?.firstName ? item.user.firstName[0] : ''}
          </Avatar>
        }
        title={item.user?.firstName ? `${item.user.firstName} ${item.user.lastName}` : 'Kullanıcı Adı'}
        subheader={item.user?.firstName ? `@${item.user.firstName}_${item.user.lastName}` : ''}
        className="bg-gray-50 p-4"
      />
      <CardMedia
        component="img"
        height="400"
        image={item.image}
        className="object-cover rounded-t-lg"
      />
      <CardContent className="p-6">
        <Typography variant="body2" sx={{ color: 'text.secondary' }} className="text-gray-800 text-lg">
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between p-4'>
        <div className='flex space-x-5'>
          <IconButton onClick={handleLikePost} className='text-red-600 hover:text-red-700'>
            {islike(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton onClick={handleShowComment} className='text-gray-700 hover:text-gray-900'>
            <ChatBubbleIcon />
          </IconButton>
        </div>

        <div className='flex space-x-5'>
          <IconButton className='text-gray-700 hover:text-gray-900'>
            <ShareIcon />
          </IconButton>
          <IconButton className='text-gray-700 hover:text-gray-900'>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      <div className="p-4">
        <Typography variant="body2" className="text-gray-600" onClick={handleShowLikes} style={{ cursor: 'pointer' }}>
          {item.liked?.length} Beğeni
        </Typography>
      </div>

      {/* Beğenen kullanıcıları liste olarak göster */}
      <Modal
        open={showLikes}
        onClose={handleShowLikes}
        aria-labelledby="like-modal-title"
        aria-describedby="like-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" className="text-center">Beğenenler</Typography>
          <div className="space-y-3 mt-4">
            {item.liked?.map((user, index) => (
              <div key={index} className='flex items-center space-x-4'>
                <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".9rem" }} src={user.profile || ''}>
                  {user.firstName ? user.firstName[0] : ''}
                </Avatar>
                <p className="text-sm text-gray-600">{user.firstName} {user.lastName}</p>
              </div>
            ))}
          </div>
        </Box>
      </Modal>

      {showComments && (
        <section className="p-4 space-y-4 bg-gray-50 rounded-b-lg">
          <div className='flex items-center space-x-3'>
            <Avatar sx={{ height: "2rem", width: "2rem" }} />
            <input
              onKeyPress={(k) => {
                if (k.key === "Enter") {
                  handleCreateComment(k.target.value);
                }
              }}
              className='w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500'
              type="text"
              placeholder='Yorum yaz'
            />
          </div>

          <Divider className='my-4' />

          <div className='space-y-3'>
            {item.comments.map((comment, index) => (
              <div key={index} className='flex items-center space-x-4'>
                <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".9rem" }}>
                  {comment.user.firstName[0]}
                </Avatar>
                <p className="text-sm text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
