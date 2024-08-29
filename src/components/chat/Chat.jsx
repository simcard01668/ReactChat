import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useState, useRef, useEffect } from 'react'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { toast } from 'react-toastify'
import { useUserStore } from '../../lib/userStore'
import { create } from 'zustand'

const Chat = () => {
  const [chat, setChat] = useState()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const endRef = useRef(null)
  const { chatId, user } = useChatStore()
  const { currentUser } = useUserStore()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  })


  //"fSXgO3moACemTDT5Fu7r"
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chat", chatId),
      (res) => {
        setChat(res.data());
      }
    );

    return () => { unSub() };
  }
    , [chatId])


  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }


  const handleSend = async () => {
    if (text === "") return;
    try {
      await updateDoc(doc(db, 'chat', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()
        })
      })

      const userIDs = [currentUser.id, user.id]

      userIDs.forEach(async (id) => {

        const userChatsRef = doc(db, 'userchats', id)
        const userChatsSnapshot = await getDoc(userChatsRef)
        
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()
          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)
 

          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now()
          console.log(userChatsData.chats[chatIndex])
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
          })
        }
      })
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem doloar hello backghround color is cool this way,.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>


      <div className="center">
        {chat?.messages?.map((message) => (
          <div className="message own" key={message?.createdAt}>
            <div className="text">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message.createdAt}</span> */}
            </div>
          </div>
        ))
        }
        <div ref={endRef}></div>
      </div>


      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message" onChange={e => setText(e.target.value)} value={text} />

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />

          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>

        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>

    </div>
  )
}

export default Chat