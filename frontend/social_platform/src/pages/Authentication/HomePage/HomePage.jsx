import { Grid } from '@mui/material'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import HomeRight from '../../../components/HomeRight/HomeRight'
import MiddlePart from '../../../components/MiddlePart'
import CreateReelsForm from '../../../components/reels/CreateReelsForm'
import Reels from '../../../components/reels/Reels'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Profile from '../../Profile/Profile'


const HomePage = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)

  console.log("authentication ",auth);
  

 
  return (
    <div className="px-20">
      
<Grid container spacing={0}>
  <Grid item xs={0} lg={3}>

    <div className="sticky top-0">

      <Sidebar/>

    </div>

  </Grid>
  <Grid  lg={location.pathname==="/"?6:9} item className="px-5 flex justify-center" xs={12}>
  <Routes>
    
    <Route path='/' element={<MiddlePart/>}/>
    <Route path='/reels' element={<Reels/>}/>
    <Route path='/create-reels' element={<CreateReelsForm/>}/>
    <Route path='/profile/:id' element={<Profile/>}/>
  </Routes>

  </Grid>

  {location.pathname==="/"  && <Grid item lg={3} className="relative" >

<div className="sticky top-0 w-full">
  <HomeRight/>
</div>

</Grid>}

</Grid>

    </div>
  )
}

export default HomePage
