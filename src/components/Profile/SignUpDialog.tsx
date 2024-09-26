import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/supabaseClient";

export default function SignUpDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignUp = async (event: { preventDefault: () => void; }) => { // Commented it out, it works but need to setup custom SMTP server to send email confirmation since Supabase rate limits email sending
    event.preventDefault();
    // setLoading(true);
    // setError(null);
    // setSuccess(null);

    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });

    // if (error) {
    //   setError(error.message);
    // } else {
    //   setSuccess("Successfully signed up! Please check your email to confirm your account.");
    // }

    // setLoading(false);
	console.log("Sign up button clicked"); 
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Sign Up</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-500">
        <DialogHeader>
          <DialogTitle className="text-white text-center">Sign Up</DialogTitle>
          <DialogDescription className="text-white text-center">
            Fill in the information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <input
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}