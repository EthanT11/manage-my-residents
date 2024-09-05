import { Button } from "./ui/button";
import React from "react";

interface CardHeaderButtonProps {
	text: string; 
	onClick?: () => void; 
	variant?: 'secondary' | 'outline'
}
// TODO: Add custom styling for the button
// TODO: Add a prop or something to change if the button is disabled by default
// NOTE: until I'm more comfortable with how ref fully works https://react.dev/reference/react/forwardRef


const CardHeaderButton = React.forwardRef<HTMLButtonElement, CardHeaderButtonProps>( // typescript <HTMLButtonElement> is the type of the ref | <CardHeaderButtonProps> is the type of the props
	({ text, onClick, variant}, ref) => {		 									 // takes two args props and ref 									
		return (
			<Button 
			ref={ref} 																// ref is passed to the button element
			className={`bg-white hover:bg-blue-600 hover:text-white ${variant}`}
			onClick={onClick}
			>
		  {text}
		</Button>
	  );
	}
);

export default CardHeaderButton;

// --------------------------------------Old code-----------------------------------------------
// export default function CardHeaderButton({text, onClick, variant}: CardHeaderButtonProps) {
//   return (
//     <>
// 	  	<Button 
// 			className={`bg-white hover:bg-blue-600 hover:text-white ${variant}`}
// 			onClick={onClick}
// 		>
// 			{text}
// 		</Button>
//     </>
//   );
// }