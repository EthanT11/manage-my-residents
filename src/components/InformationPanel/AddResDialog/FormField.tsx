import AddResLabel from "./AddResLabel";
import AddResInput from "./AddResInput";
import CalendarInput from "./CalendarInput";
import DropdownInput from "./DropdownInput";

export interface FormFieldProps {
	name: string,
	label?: string,
	type?: string,
	placeholder: string,
	value: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
	fieldType?: string,
	options?: string[],
}

export default function FormField({name, label, type, placeholder, value, onChange, options, fieldType = "input" }: FormFieldProps) {
    return (
        <div className="grid grid-cols-2 gap-4 items-center">
			<AddResLabel 
				htmlFor={name}
				className="text-white bg-blue-700 p-2 rounded-lg w-24 text-center"
			>
				{label || ""}
			</AddResLabel>
			{fieldType === 'input' && (
				<AddResInput 
					name={name} 
					type={type || "text"} 
					placeholder={placeholder} 
					value={value}
					onChange={onChange}
					className="bg-white p-2 rounded-lg"
				/>
			)}
			{fieldType === 'calendar' && (
				<CalendarInput
					name={name}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			)}
			{fieldType === 'dropdown' && (
				<DropdownInput
					name={name}
					placeholder={placeholder}
					value={value}
					options={options}
					onChange={onChange}
				/>
			)}
        </div>
    )
}