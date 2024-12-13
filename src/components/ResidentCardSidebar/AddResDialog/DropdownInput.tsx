import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FormFieldProps } from "./FormField"


interface DropdownInputProps extends FormFieldProps {

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
			<SelectTrigger className="bg-white p-2 rounded-lg" aria-label={"gender"}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-white p-2 rounded-lg">
				{options.map((option) => (
					<SelectItem key={option} value={option}>{option}</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}