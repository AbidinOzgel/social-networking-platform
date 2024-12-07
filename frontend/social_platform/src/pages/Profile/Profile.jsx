import { Avatar, Box, Button, Card, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/Post/PostCard';
import UserReelsCard from '../../components/reels/UserReelsCard';
import { getPostsByUserId } from '../../Redux/Post/post.action';
import ProfileUpdateModal from './ProfileUpdateModal';

const tabs = [
  { value: "post", name: "Gönderiler" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Kaydedilenler" },
  { value: "repost", name: "Repost" }
];

const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const savedPost = [1, 1, 1, 1, 1];

const Profile = () => { 
  const {auth}=useSelector(store=>store)
  const { id } = useParams();
  const [value, setValue] = React.useState('post');
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileUpdateModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch();
  const { posts, loading, error } = useSelector((store) => store.post);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(getPostsByUserId(id)); // Kullanıcı ID'sine göre gönderileri al
    }
  }, [id, dispatch]);

   // Profil verisinin yüklenmesini bekliyoruz
   if (auth.loading) {
    return <div>Profil verisi yükleniyor...</div>;  // Yükleniyor mesajı
  }

  // Eğer user null ise, profil verisi alınamamış demektir
  if (!auth.user) {
    return <div>Profil verisi alınamadı. Lütfen tekrar deneyin.</div>;
  }
  

  return (
    <Card className="my-10 w-[76%] mx-auto">
      <div className="rounded-md shadow-lg bg-white">
      <div className="relative h-[16rem] overflow-hidden rounded-t-md">
  <img
    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
    src={auth.user?.back_ground}
    alt="Background"
  />
</div>


        <div className="px-5 flex justify-between items-start -mt-12 relative">
          <Avatar
           src={auth.user?.profile || 'https://via.placeholder.com/150'}
            className="transform -translate-y-8"  
            sx={{ width: "11rem", height: "11rem", border: "5px solid white" }}
          />
          {true ? (
            <Button variant="contained" className="mt-4" onClick={handleOpenProfileUpdateModal}>
            Profili Güncelle
          </Button>
          ) : (
            <Button variant="contained" className="mt-4">
              Takip Et
            </Button>
          )}
        </div>

        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-lg">{auth.user?.firstName+" "+auth.user.lastName}</h1>
            <p className="text-gray-700">@{auth.user?.firstName.toLowerCase()+ "_"+ auth.user?.lastName.toLowerCase() }</p>
          </div>

          <div className="flex gap-5 items-center py-3 text-gray-600">
            <span>8 gönderi</span>
            <span>35 takipçi</span>
            <span>23 takip</span>
          </div>

          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
        </div>

        <section>
  <Box sx={{ borderBottom: 6, width: '100%', borderColor: 'divider' }}>
    <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
      {tabs.map((item) => (
        <Tab key={item.value} value={item.value} label={item.name} wrapped />
      ))}
    </Tabs>
  </Box>
  <div className="flex justify-center bg-gradient-to-b from-gray-100 to-gray-200 py-10">
    {value === "post" ? (
      <div className="w-full max-w-5xl px-4 md:px-8 space-y-8">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-shadow duration-300"
          >
            <PostCard item={post} />
          </div>
        ))}
      </div>
    ) : value === "reels" ? (
      <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-50 rounded-lg">
        {reels.map((item, index) => (
          <UserReelsCard key={index} />
        ))}
      </div>
    ) : value === "saved" ? (
      <div className="w-full max-w-5xl px-4 md:px-8 space-y-8">
        {savedPost.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-shadow duration-300"
          >
            <PostCard item={item} />
          </div>
        ))}
      </div>
    ) : null}
  </div>
</section>


      </div>
      <section>

        <ProfileUpdateModal open={open} handleClose={handleClose}/>

      </section>

    </Card>
  );  
};

export default Profile;
