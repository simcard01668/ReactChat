import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useState, useRef, useEffect } from 'react'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { toast } from 'react-toastify'
import { useUserStore } from '../../lib/userStore'
import upload from '../../lib/upload'

const Chat = () => {
  const [chat, setChat] = useState()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [img, setImg] = useState(
    {
      file: null,
      url: ""
    }
  )
  const endRef = useRef(null)
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
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

    let imgUrl = "";

    try {

      if (img.file) {
        imgUrl = await upload(img.file)
      }

      await updateDoc(doc(db, 'chat', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img:imgUrl})
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

    setImg({
      file:null,
      url:""
    })

    setText("")
  }


  function handleImg(e) {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }


  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || './avatar.png'} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
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
          <div className={message.senderId === currentUser.id ? "message own" : 'message'} key={message?.createdAt}>
            <div className="text">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message.createdAt}</span> */}
            </div>
          </div>
        ))
        }

        {img.url && <div className="message own">
          <div className="text">
            <img src={img.url} alt="" />
          </div>
        </div>}
        <div ref={endRef}></div>
      </div>


      <div className="bottom">
        <div className="icons">
          <input type="file" id='file' accept="image/*" style={{ display: "none" }} onChange={handleImg} />
          <label htmlFor="file"> <img src="./img.png" alt="" /></label>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder={isCurrentUserBlocked ? 'This User have Blocked You' : isReceiverBlocked ? 'You Have Blocked This User' : "Type a message"} onChange={e => setText(e.target.value)} value={text} disabled={isCurrentUserBlocked || isReceiverBlocked}/>

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />

          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>

        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>

    </div>
  )
}

export default Chat