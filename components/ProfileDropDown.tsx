import React from "react";
import ProfileDropDownItem from "./ProfileDropDownItem";

const ProfileDropDown: React.FC<{
  onClick: () => void;
  closeMenu: () => void;
}> = ({ onClick, closeMenu }) => {
  const dropDownMenu = [
    { text: "Your Profile", action: closeMenu },
    { action: "/properties/saved", text: "Saved Properties" },
    { action: onClick, text: "Sign Out" },
  ];
  return (
    <ul
      id="user-menu"
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabIndex={-1}
    >
      {dropDownMenu.map((d, i) => (
        <ProfileDropDownItem key={i + d.text} items={d} />
      ))}
    </ul>
  );
};

export default ProfileDropDown;
