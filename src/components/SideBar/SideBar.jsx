import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function SideBar({ handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__actions">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__profile-edit"
        >
          Edit profile
        </button>
        <button className="sidebar__profile-logout">Log out</button>
      </div>
    </div>
  );
}

export default SideBar;
