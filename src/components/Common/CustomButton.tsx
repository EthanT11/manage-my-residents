import { Button } from "../ui/button";
import React from "react";
import { cn } from "../../lib/utils"; // Helps to combine classNames

interface CustomButtonProps {
	text: string;
	type?: 'submit' | 'button' | 'reset'; 
	onClick?: () => void; 
	variant?: 'secondary' | 'outline'
	className?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
	({ text, onClick, variant, type, className }, ref) => {		 									
		return (
			<Button 
				ref={ref}
				className={cn(
					// Base style
					`rounded-lg px-4 py-2`,
					// Custom class goes here to override base style if needed
					className,
					// Theming goes after so it can override base style maybe change this?
					`
						bg-button-bg text-button-text border border-button-border
						hover:bg-button-hover active:bg-button-active
						transition-colors ${variant}
					`
				)}
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