import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { CustomInput } from "@/components/Common";
import { FormFieldProps } from "./FormField";

interface CalendarInputProps extends Omit<FormFieldProps, 'label'> {
	inputClassname?: string
}

interface CalendarLayoutProps {
	date: Date | undefined,
	handleDateSelect: (date: Date | undefined) => void,
}

function CalendarLayout( {date, handleDateSelect}: CalendarLayoutProps ) {
	
	return (
        <div className="absolute z-10">
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md bg-white p-2 z-10 shadow-lg border-2"
				fromYear={1900}
				toYear={2024}
				captionLayout="dropdown"
				// TODO: Fix dropdown placement: Year dropdown opens and populates up as opposed to down like the months dropdown
				// TODO: When you click off calendar, close it. Probably need to use  to control visibility
				// TODO: Add more styling to the calendar, hesitant to do since there's a lot of styling involved
				classNames={{
					caption: "flex flex-row items-center justify-center",
					caption_label: "hidden",
					nav: "space-x-1 flex items-center",
					dropdown: "p-1 bg-white rounded-md border shadow-sm",
					dropdown_month: "w-[110px] inline-block relative",
					dropdown_year: "w-[80px] inline-block relative",
					months: "flex flex-row"
				}}

            />
        </div>
	)
}


export default function CalendarInput( { name, type, placeholder, inputClassname, onChange } : CalendarInputProps ) {
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
		<div className="relative">
			{/* TODO: Add calendar icon and hover effects for ease of use */}
			<CustomInput 
				name={name} 
				type={type ?? 'text'}
				placeholder={placeholder}
				value={date ? handleDateFormat(date) : ''}
				onChange={onChange}
				onFocus={() => setShowCalendar(true)}
				className={inputClassname || 'bg-white p-2 rounded-lg'}
			/>
			{showCalendar && (
				<CalendarLayout 
					date={date}
					handleDateSelect={handleDateSelect}
				/>
			)}
		</div>
	)
}