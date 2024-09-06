import CardHeaderButton from "./CardHeaderButton";
import AddResDialog from "./AddResDialog";

export default function SideBarHeader({handleEdit}: {handleEdit: () => void}) {
	return (
	  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl shadow-lg flex flex-row justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">Resident Cards</h1>
		<div>
			<AddResDialog /> {/* AddResDialog is a dialog box that pops up when the add resident button is clicked */}
			<CardHeaderButton text="Edit" onClick={handleEdit} variant="secondary" />
		</div>
	  </div>
	);
  }