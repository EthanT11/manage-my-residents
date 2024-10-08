import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useSupabase from "@/hooks/useSupabase";

export default function SignUpDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { signUp } = useSupabase();
  const handleSignUp = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await signUp(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      setSuccess(result.message);
    }

    setLoading(false);
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
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}