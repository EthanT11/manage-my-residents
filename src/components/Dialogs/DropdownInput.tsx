import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FormFieldProps } from "./FormField"


interface DropdownInputProps extends FormFieldProps {
	className?: string
}


export default function DropdownInput( { name, placeholder, onChange, options=[] } : DropdownInputProps) {

	function handleChange(value: string) {
		const syntheticEvent = {
			target: {
				name,
				value
			}
		} as React.ChangeEvent<HTMLSelectElement>;

		onChange(syntheticEvent);
	}

	return (
		<Select onValueChange={handleChange}>
			<SelectTrigger 
				className={`
					w-full bg-dropdown-bg text-dropdown-text 
					border border-dropdown-border rounded-md 
					focus:ring-2 focus:ring-dropdown-ring focus:border-transparent
					hover:bg-dropdown-hover
				`} 
				aria-label={name}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent 
				 className="bg-dropdown-bg border border-dropdown-border rounded-md shadow-lg"
			>
				{options.map((option) => (
					<SelectItem 
						key={option} 
						value={option}
						className="text-dropdown-text hover:bg-dropdown-hover cursor-pointer"
					>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}