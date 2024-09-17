import { Input } from "../../ui/input";

// TODO: Add a better type for value since it's not always going to be a string

export default function AddResInput( {name, type, placeholder, onChange} : {name: string, type: string, placeholder: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void} ) {
  return (
	<Input
	  id={name}
	  name={name}
	  type={type}
	  placeholder={placeholder}
	  onChange={onChange}
	  className="w-full"
	/>
  );
}