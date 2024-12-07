import { Card } from '@mui/material'
import React from 'react'
import Searchuser from '../SearchUser'
import PopulerUsers from './PopulerUsers'


const popularUser=[1,1,1,1]
const HomeRight = () => {
  return (
    <div className='pr-5'>     

      <Searchuser/>
      <Card className='p-4'>
        
      <div className='flex justify-between py-5 items-center'>
        <p className='font-semibold opacity-70'>onerilenler</p>
        <p className='text-xs  font-semibold opacity-80'>tumunu gor</p>

      </div>
      <div className='space-y-5'>
        {popularUser.map((item)=><PopulerUsers/> )}
        
      </div>

      </Card>

      
    </div>
  )
}

export default HomeRight
