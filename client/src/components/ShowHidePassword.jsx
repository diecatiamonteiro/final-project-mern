import React from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function ShowHidePassword({ show, onToggle }) {
  return (
    <button
      type="button"
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 z-10"
      onClick={onToggle}
    >
      {show ? (
        <IoEyeOffOutline className="h-5 w-5" />
      ) : (
        <IoEyeOutline className="h-5 w-5" />
      )}
    </button>
  );
}
