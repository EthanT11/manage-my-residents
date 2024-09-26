import { useNavigate } from "react-router-dom";

// TODO add functionality to the home and login button
export default function TopNavBar() {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-sky-600 p-4 w-full font-roboto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Manage My Residents
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("account")}>Account</button>
          <button onClick={() => navigate("sign-in")}>Login</button>
        </div>
      </div>
    </nav>
  );
};