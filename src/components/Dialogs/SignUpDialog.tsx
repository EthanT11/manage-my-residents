import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { CustomButton } from "../Common";
import FormField from "./FormField";
import DialogSectionHeader from "./DialogSectionHeader";

export default function SignUpDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { signUp } = useAuth();
  
  const handleSignUp = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // TODO: Add a more robust error system, not going to worry about it for now since we're not using the sign up function
    // due to the email limit from supabase without SMTP
    const { success: isSuccess, message } = await signUp(email, password);
    if (!isSuccess) {
      setError(message);
    } else {
      setSuccess(message);
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton 
          type="button"
          variant="default"
          text="Sign Up"
          isLoading={loading}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dialog-bg border-2 border-dialog-border">
        <DialogHeader className="bg-dialog-bg p-4 rounded-t-lg border-b border-dialog-border">
          <DialogTitle className="text-dialog-title text-xl font-semibold">
            Create Account
          </DialogTitle>
          <DialogDescription className="text-dialog-text">
            Sign up for a new account to manage your personal care home.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4 p-6 bg-dialog-bg">
          <div className="space-y-4">
            <DialogSectionHeader title="Account Information" />
            
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}

            <FormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-dialog-border">
            <CustomButton 
              type="submit"
              text="Create Account"
              variant="submit"
              isLoading={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}