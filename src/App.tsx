import './App.css'
import ResidentCard from './components/ResidentCard'

// Maybe a blue and lightgray theme?
const data = { 
	residents: [
		{
			name: "bill",
			age: "65",
			wing: "Left",
			room: "100"
		},
		{
			name: "jill",
			age: "50",
			wing: "Left",
			room: "101"
		},
		{
			name: "billy",
			age: "93",
			wing: "Right",
			room: "102"
		},
	]
}

const listDummyCards = data.residents.map(resident => 
	<ResidentCard name={resident.name} age={resident.age} info={[resident.wing, resident.room]}/>
)

const CardHeader = () => {
	return (
		<div className="bg-blue-600 p-4">
			<h1 className="text-white text-2xl font-bold">Resident Cards</h1>
			<button className="bg-white text-blue-600 font-bold py-2 px-4 rounded">Add Resident</button>
		</div>
	)
}


function App() {
  return (
	<div className="flex w-full">
		<div className="flex flex-col p-4">
			<CardHeader />
			<div className="grid grid-cols-2">
				{listDummyCards}
			</div>
		</div>
	</div>
  )
}

export default App
