import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AddResLabel from "./AddResLabel";
import AddResInput from "./AddResInput";

 
export default function SignUpDialog() {

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
		</DialogContent>
    </Dialog>
  )
}