import { Button } from "../ui/button";
import React from "react";

interface CustomButtonProps {
	text: string;
	type?: 'submit' | 'button' | 'reset'; 
	onClick?: () => void; 
	variant?: 'secondary' | 'outline'
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
	({ text, onClick, variant, type}, ref) => {		 									
		return (
			<Button 
				ref={ref}
				className={`
					bg-button-bg text-button-text border border-button-border
					hover:bg-button-hover active:bg-button-active
					transition-colors ${variant}
				`}
				onClick={onClick}
				type={type}
			>
				{text}
			</Button>
		);
	}
);

CustomButton.displayName = "CustomButton";

export default CustomButton; 