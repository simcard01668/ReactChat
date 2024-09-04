import './userinfo.css'
import { useUserStore } from '../../../lib/userStore'
import UserSetting from './UserSetting/userSetting'
import { useState } from 'react'
const Userinfo = () => {
  const [addDetail, setAddDetail] = useState(false)
  const { currentUser, isLoading, fetchUserInfo} = useUserStore()

  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser.avatar || './avatar.png'} alt='' />
            <h3>{currentUser.username}</h3>
        </div>
        <div className="icons">
            <img onClick={()=>setAddDetail((prev)=>!prev)}src={addDetail ? './cross.png' : './more.png'} alt='' />
            <img src='./video.png' alt='' />
            <img src='./edit.png' alt='' />        
        </div>

        {
        addDetail && <UserSetting setBack={()=>setAddDetail(false)}/>
      }
    </div>


  )
}

export default Userinfo