import { Input } from "../ui/input";

interface CustomInputProps {
	name: string,
	type: string,
	placeholder: string,
	value: string | number | boolean | undefined,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onFocus?: () => void,
	className?: string,
	required?: boolean
}

export default function CustomInput( {name, type, placeholder, value, onChange, onFocus, className, required} : CustomInputProps ) {

  return (
	<Input
	  id={name}
	  name={name}
	  type={type}
	  value={value?.toString() ?? ''}
	  placeholder={placeholder}
	  onChange={onChange}
	  className={`w-full bg-search-bg text-search-text border border-search-border rounded-md px-3 py-2 
                  focus:ring-2 focus:ring-search-ring focus:border-transparent
                  placeholder:text-search-placeholder ${className}`}
	  onFocus={onFocus}
	  required={required || false}
	/>
  );
}