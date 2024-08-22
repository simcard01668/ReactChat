import './login.css'
import { auth, db, storage } from 'C:/Users/sim/Desktop/github/ReactChat/src/lib/firebase.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload'

const login = () => {
    const [Img, setImg] = useState({
        file: null,
        url: ""
    })

    function handleImg(e) {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    function handleLogin(e) {
        e.preventDefault()
        toast.success("Please wait...")
    }

    async function handleRegister(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)
    

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upload(Img.file)

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: []
            })
            
            await setDoc(doc(db, "userchats", res.user.uid), {
               chat: []
            })

            toast.success("User created successfully")
        } catch(err) {
            toast.error(err.message)
            console.log(err)
        }
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <img src={Img.url || "./avatar.png"} alt="" />
                    <input type="file" id='file' style={{ display: "none" }} onChange={handleImg} />
                    <label htmlFor="file">Upload an image</label>
                    <input type="text" placeholder="Username" name='username' />
                    <input type="text" placeholder="Email" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default login