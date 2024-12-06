import AddResLabel from "./AddResLabel";
import AddResInput from "./AddResInput";
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";

interface FormFieldProps {
	name: string,
	label: string,
	type: string,
	placeholder: string,
	value: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	fieldType?: string,
}

interface CalendarInputProps extends Omit<FormFieldProps, 'label'> {
	
}

function CalendarInput( { name, type, placeholder, onChange } : CalendarInputProps ) {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [showCalendar, setShowCalendar] = useState(false)
	
	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate)
			setShowCalendar(false)
			onChange({ target: {name, value: handleDateFormat(selectedDate) } } as React.ChangeEvent<HTMLInputElement>)
		}
	}

	// Change to this format since it's convient for supabase
    const handleDateFormat = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

	return (
		<div className="relative"> {/* TODO: Fix calendar placement */}
			<AddResInput 
				name={name} 
				type={type}
				placeholder={placeholder}
				value={date ? handleDateFormat(date) : ''}
				onChange={onChange}
				onFocus={() => setShowCalendar(true)}
				className="bg-white p-2 rounded-lg"
			/>
			{showCalendar && (
				<div className="absolute z-10">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						className="rounded-md bg-white p-2 z-10 shadow-lg border-2"
					/>
				</div>
			)}
		</div>
	)
}


export default function FormField({name, label, type, placeholder, value, onChange, fieldType = "input" }: FormFieldProps) {
    return (
        <div className="grid grid-cols-2 gap-4 items-center"> {/*space-x-4 for spacing between the label and input*/}
			<AddResLabel 
				htmlFor={name}
				className="text-white bg-blue-700 p-2 rounded-lg w-24 text-center"
				>
					{label}
			</AddResLabel>
			{fieldType === 'input' && (
				<AddResInput 
					name={name} 
					type={type} 
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
			
        </div>
    )
}