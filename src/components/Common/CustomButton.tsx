import { Button } from "../ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface CustomButtonProps {
	text: string;
	type?: 'submit' | 'button' | 'reset'; 
	onClick?: () => void; 
	variant?: 'default' | 'destructive' | 'submit';
	className?: string;
	isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
	({ text, onClick, variant, type, className, isLoading }, ref) => {
		const baseStyles = "rounded-lg px-4 py-2 theme-transition";
		
		const variantStyles = {
			default: "bg-button-bg text-button-text border border-button-border hover:bg-button-hover active:bg-button-active",
			destructive: `bg-button-destructive-bg text-button-destructive-text border border-button-destructive-border 
						  hover:bg-button-destructive-hover active:bg-button-destructive-active`,
			submit: `bg-button-submit-bg text-button-submit-text border border-button-submit-border 
					 hover:bg-button-submit-hover active:bg-button-submit-active`,
		};

		return (
			<Button 
				ref={ref}
				className={cn(
					baseStyles,
					variantStyles[variant || 'default'],
					className
				)}
				onClick={onClick}
				type={type}
			>
				{isLoading ? <LoadingSpinner size="md" /> : text}
			</Button>
		);
	}
);

CustomButton.displayName = "CustomButton";

export default CustomButton; 