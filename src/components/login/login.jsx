import './login.css'
import { useState } from 'react'
import { toast } from 'react-toastify'

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

    function handleRegister(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)
        console.log (username, email, password)
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