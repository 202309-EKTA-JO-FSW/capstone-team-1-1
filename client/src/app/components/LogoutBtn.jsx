"use client";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchLogout } from "../lib/data";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { logoutUser } from "../redux/features/auth/AuthSlice";

const LogoutBtn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // handle logout
  const handleLogout = async () => {
    const logout = await fetchLogout();
    if (logout) {
      // if logout suuccefully empty local storage
      localStorage.clear();
      window.dispatchEvent(new Event("storage"));
      dispatch(logoutUser());
      // navigate to home page
      router.push("/");
    }
  };
  return (
    <button className="sidebar-btn" onClick={handleLogout}>
      <IoLogOutOutline className="text-2xl" />{" "}
      <span className="pl-1">Log out</span>
    </button>
  );
};

export default LogoutBtn;
