import { Button } from "./ui/button";

interface CardHeaderButtonProps {
	text: string; 
	onClick: () => void; 
	variant?: 'secondary' | 'outline'
}
// TODO: Add custom styling for the button

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