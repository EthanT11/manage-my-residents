import { Input } from "./ui/input";

export default function AddResInput( {name, type, placeholder} : {name: string, type: string, placeholder: string} ) {
  return (
	<Input
	  id={name}
	  name={name}
	  type={type}
	  placeholder={placeholder}
	  className="w-full"
	/>
  );
}