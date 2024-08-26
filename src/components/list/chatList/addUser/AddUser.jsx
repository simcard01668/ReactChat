import './addUser.css'
import { db } from '../../../../lib/firebase'
import { useState } from 'react'

const AddUser = () => {
    const [users, setUsers] = useState()
    const handleSearch = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = Object.fromEntries(formData)

        try {
            userRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));

            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty) {
              setUsers(querySnapshot.docs[0].data())
            }
        } catch(err) {
            console.log(err)
        }
    }
  return (
    <div className="addUser">
        <form action="" onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username'/>
            <button>Search</button>
        </form>

{ user &&       <div className="user">
            <div className="detail">
                <img src={user.avatar ||"./avatar.png"} alt="" />
                <span>{user.username}</span>
            </div>
            <button>Add User</button>
        </div>}

   
    
    </div>
  )
}

export default AddUser