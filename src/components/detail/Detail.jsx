import './detail.css'
import { useState } from 'react'
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

const Detail = () => {
  const [showPhotos, setShowPhotos] = useState(true)
  const { currentUser } = useUserStore()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()

  const handleBlock = async () => {
    if (!user) return
    const userDocRef = doc(db, 'users', currentUser.id)
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (err) {
      console.error(err)
    }


  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || './avatar.png'} alt="" />
        <h2>{user?.username}</h2>
        <p>{user?.introduction}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>


        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={showPhotos ? './arrowDown.png' : './arrowUp.png'} alt="" onClick={() => setShowPhotos((prev) => !prev)} />
          </div>

          {showPhotos && (<div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpg" alt="" />
                <span>photo_sample.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpg" alt="" />
                <span>photo_sample.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpg" alt="" />
                <span>photo_sample.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpg" alt="" />
                <span>photo_sample.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
          </div>)}
        </div>


        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>

        <button className="button" onClick={handleBlock}>{
          isCurrentUserBlocked ? 'You are Blocked' : isReceiverBlocked ? 'User Blocked' : 'Block User'
        }</button>
        <button className="logout" onClick={() => auth.signOut()}>Logout</button>

      </div>
    </div >
  )
}

export default Detail