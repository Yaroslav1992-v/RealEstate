import React, { useState } from "react";
import ProfileDropDown from "../../ProfileDropDown";
import { NotificationBtn } from "./NotificationBtn";
import UserProfileBtn from "./UserProfileBtn";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const DekstopRightMenu: React.FC<{ image?: string; id: string }> = ({
  image,
  id,
}) => {
  const [isProfileMenuOpen, setsProfileMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const openProfileDropDown = () => {
    setsProfileMenuOpen((prev) => !prev);
    router.push(`/profile/${id}`);
  };
  const handleSignOut = () => {
    signOut();
    openProfileDropDown();
  };
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
      <NotificationBtn />
      <div className="relative ml-3">
        <div>
          <UserProfileBtn image={image} onClick={openProfileDropDown} />
        </div>
        {isProfileMenuOpen && (
          <ProfileDropDown
            closeMenu={openProfileDropDown}
            onClick={handleSignOut}
          />
        )}
      </div>
    </div>
  );
};

export default DekstopRightMenu;
