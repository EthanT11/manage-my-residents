// TODO add functionality to the Add Resident button
import HeaderButton from "./HeaderButton";

export default function CardHeader({text}: {text: React.ReactNode}) {
	const handleClick = () => {
		console.log("Add Res Clicked!")
	}
	return (
	  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl shadow-lg flex justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">{text}</h1>
		<HeaderButton text="Add Resident" onClick={handleClick} />
	  </div>
	);
  }