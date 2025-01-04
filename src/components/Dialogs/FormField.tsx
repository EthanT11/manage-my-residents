import { CustomLabel, CustomInput } from "@/components/Common";
import CalendarInput from "./CalendarInput";
import DropdownInput from "./DropdownInput";

export interface FormFieldProps {
	name: string,
	label?: string,
	type?: string,
	placeholder: string,
	value: string | number | boolean | undefined,
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
	fieldType?: string,
	options?: string[],
	required?: boolean
}

export default function FormField({name, label, type, placeholder, value, onChange, options, required, fieldType = "input" }: FormFieldProps) {
    return (
        <div className="flex flex-col space-y-2">
            <CustomLabel 
                htmlFor={name}
                className="text-infopanel-text font-medium text-sm"
            >
                {label || ""}
            </CustomLabel>
            {fieldType === 'input' && (
                <CustomInput 
                    name={name} 
                    type={type || "text"} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                    
                    required={required}
                />
            )}
            {fieldType === 'calendar' && (
                <CalendarInput
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    inputClassname="w-full bg-search-bg text-search-text border border-search-border rounded-md px-3 py-2 
                             focus:ring-2 focus:ring-search-ring focus:border-transparent
                             placeholder:text-search-placeholder"
                    required={required}
                />
            )}
            {fieldType === 'dropdown' && (
                <DropdownInput
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    options={options}
                    onChange={onChange}
                    className="w-full bg-search-bg text-search-text border border-search-border rounded-md px-3 py-2 
                             focus:ring-2 focus:ring-search-ring focus:border-transparent
                             placeholder:text-search-placeholder"
                    required={required}
                />
            )}
        </div>
    )
}