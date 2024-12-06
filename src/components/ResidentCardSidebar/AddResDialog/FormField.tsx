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

function CalendarInput() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [showCalendar, setShowCalendar] = useState(false)
	return (
		<div className="relative">
			<AddResInput 
				name="age" 
				type="text" 
				placeholder="Enter Age" 
				value={date?.toLocaleDateString() || ""}
				onChange={() => {}}
				onFocus={() => setShowCalendar(true)}
				className="bg-white p-2 rounded-lg"
			/>
			{showCalendar && (
				<div className="absolute top-12 left-0 z-10">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(date) => {
							setDate(date)
							setShowCalendar(false)
						}}
						className="rounded-md border bg-white"
					/>
				</div>
			)}
		</div>
		// <Calendar
		// 	mode="single"
		// 	selected={date}
		// 	onSelect={(date) => setDate(date)}
		// 	className="rounded-md border"
		// />
	)
}


export default function FormField({name, label, type, placeholder, value, onChange, fieldType = "input" }: FormFieldProps) {
    return (
        <div className="grid grid-cols-2 gap-4 items-center"> {/*space-x-4 for spacing between the label and input*/}
			<AddResLabel 
				htmlFor={name}
				className="text-white bg-blue-700 p-2 rounded-lg w-24 text-center"
				>{label}
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
				<CalendarInput />
			)}
			
        </div>
    )
}