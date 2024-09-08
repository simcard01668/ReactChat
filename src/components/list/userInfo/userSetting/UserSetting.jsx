import { toast } from "react-toastify";
import "./userSetting.css";
import { db } from "../../../../lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";
import { useState } from "react";
import upload from "../../../../lib/upload";

const UserSetting = ({ setBack }) => {

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

  const { currentUser, setCurrentUser } = useUserStore();

  //save user setting
  const handleSave = async (e) => {
    toast.info("Please wait while we save your setting");
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, avatar, introduction } = Object.fromEntries(formData);
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (introduction) updateData.introduction = introduction;

    try {
      if (Img.file) {
        const imgUrl = await upload(Img.file);
        updateData.avatar = imgUrl;
      }
      await updateDoc(doc(db, "users", currentUser.id), updateData);

      setCurrentUser({ ...currentUser, ...updateData });


      toast.success("User setting saved successfully");

    } catch (err) {
      console.log(err);
      toast.error("Failed to save user setting" + err.message);
    }
  };

  return (
    <div className="userSetting">
      <button className="backButton" onClick={setBack}>
        back
      </button>
      <h2>User Setting</h2>
      <form onSubmit={handleSave}>
        <input
          className="text-input"
          type="text"
          name="username"
          placeholder={currentUser.username}  
          maxLength={15}
        />
        <input
          className="text-input"
          type="text"
          name="email"
          placeholder={currentUser.email}
          maxLength={40}
        />

        <div className="imgContainer">
          <input className='imageButton' id="file" type="file" placeholder="Update your avatar" style={{display: "none"}} onChange={handleImg}/>
          <img src={Img.url || currentUser.avatar || 'avatar.png'} alt="" />
          <label htmlFor="file">Update your avatar</label>
        </div>

        <textarea
          className="text-input"
          placeholder={currentUser.introduction || "Write something about yourself"}
          name="introduction"
          rows="4"
          cols="40"
          maxLength={100}
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
};

export default UserSetting;
