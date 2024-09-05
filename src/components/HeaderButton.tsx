import { Button } from "./ui/button";

export default function HeaderButton({text, onClick, variant}: {text: string; onClick: () => void; variant?: 'secondary' | 'outline'}) {
  return ( // TODO: maybe an interface for the props
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