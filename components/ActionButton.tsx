import React from "react";
import { IconType } from "react-icons";
import Spinner from "./Spinner";
export interface BookMarkProps {
  className: string;
  Icon?: IconType;
  text: string;
  action: () => void;
  loading?: boolean;
}
const ActionButton: React.FC<BookMarkProps> = ({ ...props }) => {
  return (
    <button
      onClick={props.action}
      className={
        "font-bold text-white w-full py-2 px-4 rounded-full flex items-center justify-center " +
        props.className
      }
    >
      {props.loading ? (
        <Spinner color="#FFFFF" loading={props.loading} size={20} />
      ) : (
        props.Icon && (
          <>
            <props.Icon className="mr-2" />
            {props.text}
          </>
        )
      )}
    </button>
  );
};

export default ActionButton;
