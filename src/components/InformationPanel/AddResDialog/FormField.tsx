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
        <div className="flex flex-col space-y-2">
            <AddResLabel 
                htmlFor={name}
                className="text-infopanel-text font-medium text-sm"
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
                    className="w-full bg-search-bg text-search-text border border-search-border rounded-md px-3 py-2 
                             focus:ring-2 focus:ring-search-ring focus:border-transparent
                             placeholder:text-search-placeholder"
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