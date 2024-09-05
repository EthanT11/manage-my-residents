import { Button } from "./ui/button";

interface CardHeaderButtonProps {
	text: string; 
	onClick?: () => void; 
	variant?: 'secondary' | 'outline'
}
// TODO: Add custom styling for the button
// TODO: Add a prop or something to change if the button is disabled by default

export default function CardHeaderButton({text, onClick, variant}: CardHeaderButtonProps) {
  return (
    <>
	  	<Button 
			className={`bg-white hover:bg-blue-600 hover:text-white ${variant}`}
			onClick={onClick}
		>
			{text}
		</Button>
    </>
  );
}