import React, { useState } from "react";
import ProfileDropDown from "../../ProfileDropDown";
import { NotificationBtn } from "./NotificationBtn";
import UserProfileBtn from "./UserProfileBtn";
const DekstopRightMenu = () => {
  const [isProfileMenuOpen, setsProfileMenuOpen] = useState<boolean>(false);
  const openProfileDropDown = () => {
    setsProfileMenuOpen((prev) => !prev);
  };

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
      <NotificationBtn />
      <div className="relative ml-3">
        <div>
          <UserProfileBtn onClick={openProfileDropDown} />
        </div>
        {isProfileMenuOpen && <ProfileDropDown />}
      </div>
    </div>
  );
};

export default DekstopRightMenu;
