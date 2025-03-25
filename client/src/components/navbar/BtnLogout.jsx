import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { DataContext } from "../../contexts/Context";
import { logout } from "../../api/usersApi";

export default function BtnLogout() {
  const { usersDispatch } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(usersDispatch);
    navigate("/");
  };

  return (
    <Button variant="white" onClick={handleLogout}>
      Logout
    </Button>
  );
}
