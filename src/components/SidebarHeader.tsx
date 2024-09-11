import CardHeaderButton from "./CardHeaderButton";
import AddResDialog from "./AddResDialog";

export default function SideBarHeader({handleAddResident}: {handleAddResident: () => void}) {
	return (
	  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl shadow-lg flex flex-row justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">Resident Cards</h1>
		<div>
			<AddResDialog handleAddResident={handleAddResident}/> {/* AddResDialog is a dialog box that pops up when the add resident button is clicked */}
			<CardHeaderButton text="Edit" variant="secondary" />
		</div>
	  </div>
	);
  }