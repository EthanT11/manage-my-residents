import CardHeaderButton from "./CardHeaderButton";
import { AddResDialog } from "./AddResDialog";
import { Resident } from "@/hooks/useSupabase";

interface SideBarHeaderProps {
	addResident: (resident: Omit<Resident, 'id'>) => void;
	toggleFilter: {
		filter: boolean;
		setFilter: (filter: boolean) => void;
	};
}

export default function SideBarHeader({addResident, toggleFilter}: SideBarHeaderProps) {
	const { filter, setFilter } = toggleFilter;
	const handleFilter = () => {
		setFilter(!filter);
		console.log(filter)
	}

	return (
	  <div className="bg-blue-500 p-4 rounded-t-xl shadow-lg flex flex-row justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">Resident Cards</h1>
		<div>
			<AddResDialog addResident={addResident}/> {/* AddResDialog is a dialog box that pops up when the add resident button is clicked */}
			<CardHeaderButton text="Filter" variant="secondary" onClick={handleFilter}/>
			<CardHeaderButton text="Edit" variant="secondary" />
		</div>
	  </div>
	);
  }