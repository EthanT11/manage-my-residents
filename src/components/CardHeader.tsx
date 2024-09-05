// TODO add functionality to the Add Resident button
import CardHeaderButton from "./CardHeaderButton";
import AddResDialog from "./AddResDialog";

export default function CardHeader({text, handleAddRes, handleEdit}: {text: React.ReactNode; handleAddRes: () => void; handleEdit: () => void}) {
	return (
	  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl shadow-lg flex justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">{text}</h1>
		<AddResDialog />
		<CardHeaderButton text="Edit" onClick={handleEdit} variant="secondary" />
	  </div>
	);
  }