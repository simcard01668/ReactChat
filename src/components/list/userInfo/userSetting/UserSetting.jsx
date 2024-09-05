import { toast } from "react-toastify";
import "./userSetting.css";
import { db } from "../../../../lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";

const UserSetting = ({ setBack }) => {

  const { currentUser } = useUserStore();
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, avatar, introduction } = Object.fromEntries(formData);
    const updateData = {};

    // Check if each field has a value and add it to the updateData object
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (introduction) updateData.introduction = introduction;

    try {
     await updateDoc(doc(db, "users", currentUser.id), updateData);   

    } catch (err) {
      console.log(err);
      toast.error("Failed to save user setting");
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
          placeholder="Update your username"
        />
        <input
          className="text-input"
          type="text"
          name="email"
          placeholder="Update your email"
        />
        <input type="file" placeholder="Update your avatar" />
        <textarea
          className="text-input"
          placeholder="Update your personal introduction message"
          name="introduction"
          rows="4"
          cols="40"
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
};

export default UserSetting;
