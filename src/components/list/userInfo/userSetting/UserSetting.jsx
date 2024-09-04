import "./userSetting.css";

const UserSetting = ({setBack}) => {
  
  return (
    <div className="userSetting">
      <button className="backButton" onClick={setBack}>back</button>
      <h2>User Setting</h2>
      <input
        className="text-input"
        type="text"
        placeholder="Update your username"
      />
      <input
        className="text-input"
        type="text"
        placeholder="Update your email"
      />
      <input type="file" placeholder="Update your avatar" />
      <textarea
        className="text-input"
        placeholder="Update your personal introduction message"
        rows="4"
        cols="40"
      ></textarea>
      <button>Save</button>
    </div>
  );
};

export default UserSetting;
