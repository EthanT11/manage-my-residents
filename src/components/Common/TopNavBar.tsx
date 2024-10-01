import { useNavigate } from "react-router-dom";
import useSupabase from "@/hooks/useSupabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function TopNavBar() {
  const navigate = useNavigate();
  const { fetchUser, signOut } = useSupabase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => { 
      const { user } = await fetchUser(); 
      setUser(user); // set the user state to the user object returned from fetchUser
    };
    getUser();
  }, []);
  
  const handleSignOut = async () => {
    const signedOut = await signOut();
    if (signedOut) {
      setUser(null);
      navigate("/sign-in");
    }
  }

  return (
<nav className="bg-sky-600 p-4 w-full font-roboto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Manage My Residents
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/account")}>Account</button>
          {user ? (
            <button onClick={handleSignOut}>Logout</button>
          ) : (
            <button onClick={() => navigate("/sign-in")}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};