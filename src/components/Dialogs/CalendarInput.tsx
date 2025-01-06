import { Calendar } from "@/components/ui/calendar"
import { useState, useRef, useEffect } from "react";
import { CustomInput } from "@/components/Common";
import { FormFieldProps } from "./FormField";
import { useResidents } from "@/contexts/ResidentContext";

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


	// TODO: Look into Calendar and Daypicker components to split up the year and month dropdowns
	return (
		<div ref={calendarRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
			<Calendar
				initialFocus
				mode="single"
				selected={date}
				onSelect={handleDateSelect}
				fromYear={1900}
				toYear={1981}
				captionLayout="dropdown"
				className="p-2 z-10 shadow-lg rounded-md border-2 border-calendar-border
					bg-calendar-bg text-calendar-text theme-transition"
				classNames={{
					caption: "flex flex-row items-center justify-center p-1", // Top of the calendar Month and Year
					caption_label: "hidden", // hide the caption label, doubles the caption
					dropdown: "p-1 border-calendar-dropdown-border border shadow-sm bg-calendar-dropdown-bg",
					dropdown_month: "w-[110px] inline-block relative",
					dropdown_year: "w-[80px] inline-block relative",
					head_cell: "text-secondary-text w-full font-normal",
					cell: "relative",
					day: "h-9 w-9 p-0 font-normal rounded-md hover:bg-button-submit-hover focus:bg-button-submit-hover aria-selected:bg-button-submit aria-selected:text-white",
					day_selected: "bg-button-submit-active text-white hover:bg-button-submit-hover",	
					day_outside: "text-calendar-cell-disabled opacity-50 hover:bg-gray-100/50",
				}}
			/>
		</div>
	);
}

export default function CalendarInput({ name, type, placeholder, inputClassname, onChange }: CalendarInputProps) {
	const [date, setDate] = useState<Date | undefined>();
	const [showCalendar, setShowCalendar] = useState(false);
	const { selectedResident } = useResidents();

	useEffect(() => {
		if (selectedResident?.dob) {
			const [year, month, day] = selectedResident.dob.split('-');
			setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
		} else {
			setDate(new Date(1980, 0, 1)); // Default date if no resident selected
		}
	}, [selectedResident]);

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