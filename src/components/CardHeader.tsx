// TODO add functionality to the Add Resident button
import AddResidentButton from "./AddResidentButton";

export default function CardHeader({text}: {text: React.ReactNode}) {
	return (
	  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl shadow-lg flex justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">{text}</h1>
		{/* <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-50 transition duration-300">
		  Add Resident
		</button> */}
		<AddResidentButton text="Add Resident"/>
	  </div>
	);
  }