import './detail.css'
import { useState } from 'react'

const Detail = () => {
const [showPhotos, setShowPhotos] = useState(true)


  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
            <img src={showPhotos ? './arrowDown.png' : './arrowUp.png'} alt="" onClick={()=> setShowPhotos((prev) => !prev)}/>
          </div>

          { showPhotos && (<div className="photos">
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
          </div> )}
        </div>


        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>

        <button className="button">Block User</button>
        <button className="logout">Logout</button>

      </div>
    </div >
  )
}

export default Detail