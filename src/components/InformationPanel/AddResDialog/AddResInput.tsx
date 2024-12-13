import { Input } from "../../ui/input";

interface AddResInputProps {
	name: string,
	type: string,
	placeholder: string,
	value: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onFocus?: () => void,
	className: string
}

export default function AddResInput( {name, type, placeholder, value, onChange, onFocus, className} : AddResInputProps ) {
  return (
	<Input
	  id={name}
	  name={name}
	  type={type}
	  value={value}
	  placeholder={placeholder}
	  onChange={onChange}
	  className={className}
	  onFocus={onFocus}
	/>
  );
}