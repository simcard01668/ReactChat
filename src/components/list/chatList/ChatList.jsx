import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useUserStore } from '../../../lib/userStore'
import AddUser from './addUser/AddUser'
import './chatList.css'
import { useEffect, useState } from 'react'
import { db } from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore'

const chatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);
  
  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      
      const { user, ...rest} = item;
      return rest;

    }); 
    const chatIndex = userChats.findIndex((item) => { console.log(chat); return item.chatId === chat });
    
    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, 'userchats', currentUser.id);
    try {
      await updateDoc(userChatsRef, { chats: userChats });
      changeChat(chats[0].chatId, chats[0].user);
    } catch (error) {
      console.error(error);
    }
  }
  
  const filteredChats = chats.filter(c =>
    c.user.username.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='Search' onChange={(e)=>setInput(e.target.value)}/>
        </div>

        <img className='add' src={addMode ? "./minus.png" : "./plus.png"} alt="" onClick={() => setAddMode((prev) => !prev)} />
      </div>

     
      
      {filteredChats.map((chat) => (
        
      <div className="item" key={chat.chatId} style={{backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"}} onClick={()=>handleSelect(chat.chatId)} >
        <img src={chat.user.blocked.includes(currentUser.id) ? 'avatar.png' : chat.user.avatar} alt="" />
        <div className="text">
          <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
          <p>{chat.lastMessage}</p>
        </div>
      </div>

      ))}

      
      {
        addMode && <AddUser />
      }
      

    </div>
  )
}

export default chatList