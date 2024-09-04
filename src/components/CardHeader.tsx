// TODO add functionality to the Add Resident button

export default function CardHeader() {
	return (
	  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-xl shadow-lg flex justify-between items-center">
		<h1 className="text-white text-2xl font-semibold">Resident Cards</h1>
		<button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-50 transition duration-300">
		  Add Resident
		</button>
	  </div>
	);
  }