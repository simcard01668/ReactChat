import './login.css'
import { auth, db, storage } from '../../lib/firebase.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload'
import { collection, getDocs, query, where } from 'firebase/firestore'

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

    const [loading, setLoading] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)


        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Logged in successfully")
        } catch (err) {
            console.log(err)
            toast.error(err.message)

        } finally {
            setLoading(false)
        }
    }

    async function handleRegister(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData)

        if (!username || !email || !password)
            return toast.warn("Please enter inputs!");
        if (!Img.file) return toast.warn("Please upload an avatar!");

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return toast.warn("Select another username");
        }

        setLoading(true)

        try {
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
        } catch (err) {
            toast.error(err.message)
            console.log(err)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="imgContainer">
                        <img src={Img.url || "./avatar.png"} alt="" />
                        <label htmlFor="file">Upload an image</label>
                        <input type="file" id='file' style={{ display: "none" }} onChange={handleImg} />
                    </div>
                    <input type="text" placeholder="Username" name='username' />
                    <input type="text" placeholder="Email" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    )
}

export default login