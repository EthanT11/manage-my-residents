import { Button } from "../../ui/button";
import React from "react";

interface CardHeaderButtonProps {
	text: string;
	type?: 'submit' | 'button' | 'reset'; 
	onClick?: () => void; 
	variant?: 'secondary' | 'outline'
}

const CardHeaderButton = React.forwardRef<HTMLButtonElement, CardHeaderButtonProps>(
	({ text, onClick, variant, type}, ref) => {		 									
		return (
			<Button 
				ref={ref}
				className={`bg-white hover:bg-blue-600 hover:text-white ${variant}`}
				onClick={onClick}
				type={type}
			>
				{text}
			</Button>
		);
	}
);

CardHeaderButton.displayName = "CardHeaderButton";

export default CardHeaderButton; 