import AddResLabel from "./AddResLabel";
import AddResInput from "./AddResInput";

interface FormFieldProps {
	name: string,
	label: string,
	type: string,
	placeholder: string,
	value: any,
	onChange: any // Change type after
}

export default function FormField({ name, label, type, placeholder, value, onChange }: FormFieldProps) {
    return (
        <div className="grid grid-cols-2 gap-4 items-center"> {/*space-x-4 for spacing between the label and input*/}
			<AddResLabel htmlFor={name}>{label}</AddResLabel>
			<AddResInput 
				name={name} 
				type={type} 
				placeholder={placeholder} 
				value={value}
				onChange={onChange}
			/>
        </div>
    )
}