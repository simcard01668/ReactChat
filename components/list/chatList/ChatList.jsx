import './chatList.css'
import { useState } from 'react'

const chatList = () => {

  const [img, setImg] = useState(false)

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div>

        <img className='add' src={img ? "./minus.png" : "./plus.png"} alt="" onClick={() => setImg((prev) => !prev)} />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default chatList