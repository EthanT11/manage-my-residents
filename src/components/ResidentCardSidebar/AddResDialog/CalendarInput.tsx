import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import AddResInput from "./AddResInput";
import { FormFieldProps } from "./FormField";

interface CalendarInputProps extends Omit<FormFieldProps, 'label'> {
	
}

export default function CalendarInput( { name, type, placeholder, onChange } : CalendarInputProps ) {
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