import { Input } from "../../ui/input";

// TODO: Add a better type for value since it's not always going to be a string

export default function AddResInput( {name, type, placeholder, value, onChange} : {name: string, type: string, placeholder: string, value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void} ) {
  return (
	<Input
	  id={name}
	  name={name}
	  type={type}
	  value={value}
	  placeholder={placeholder}
	  onChange={onChange}
	  className="w-42"
	/>
  );
}