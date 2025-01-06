import { Calendar } from "@/components/ui/calendar"
import { useState, useRef, useEffect } from "react";
import { CustomInput } from "@/components/Common";
import { FormFieldProps } from "./FormField";

interface CalendarInputProps extends Omit<FormFieldProps, 'label'> {
	inputClassname?: string
}

interface CalendarLayoutProps {
	date: Date | undefined;
	handleDateSelect: (date: Date | undefined) => void;
	showCalendar: boolean;
	setShowCalendar: (show: boolean) => void;
}

function CalendarLayout({ date, handleDateSelect, showCalendar, setShowCalendar }: CalendarLayoutProps) {
	const calendarRef = useRef<HTMLDivElement>(null); // get the calendar element

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) { // if the calendar is not clicked, close it
				setShowCalendar(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setShowCalendar]);

	if (!showCalendar) return null;

	return (
		<div ref={calendarRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
			<Calendar
				mode="single"
				selected={date}
				onSelect={handleDateSelect}
				className="rounded-md bg-white p-2 z-10 shadow-lg border-2"
				fromYear={1900}
				toYear={1981}
				captionLayout="dropdown"
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
	);
}

export default function CalendarInput({ name, type, placeholder, inputClassname, onChange }: CalendarInputProps) {
	const [date, setDate] = useState<Date | undefined>(new Date(1980, 0, 1));
	const [showCalendar, setShowCalendar] = useState(false);
	
	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
			setShowCalendar(false);
			onChange({ target: {name, value: handleDateFormat(selectedDate) }} as React.ChangeEvent<HTMLInputElement>);
		}
	};

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
			<CalendarLayout 
				date={date}
				handleDateSelect={handleDateSelect}
				showCalendar={showCalendar}
				setShowCalendar={setShowCalendar}
			/>
		</div>
	);
}